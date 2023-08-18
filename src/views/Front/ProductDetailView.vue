<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link class="breadcrumb-text" to="/">首頁</router-link></li>
        <li class="breadcrumb-item"><router-link class="breadcrumb-text" to="/products">產品</router-link></li>
        <li class="breadcrumb-item active link-title" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row">
        <div class="col-12 col-md-6 d-flex">
          <img class="img-fluid rounded float-left" :src="product.imageUrl" :alt="product.title">
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
            <h1>{{ product.title }}</h1>
            <br>
            <p>{{ product.description }}</p>
            <p class="detail-content">{{ product.content }}</p>
            <div class="row mt-3">
                <div class="input-group col-lg-7 col-md-6 w-auto detail-qty mt-auto">
                    <button class="btn btn-outline-secondary" type="button"
                      @click.prevent="reQty(-1)"
                    :disabled="product_qty === 1">-
                    </button>
                    <input type="number" class="form-control" placeholder="Recipient's username"
                        aria-label="qty" v-model="product_qty"
                        min="1" max="15" style="width: 150px;">
                    <button class="btn btn-outline-secondary" type="button"
                    @click.prevent="reQty(1)" :disabled="product_qty === 15">+
                    </button>
                </div>
                <div class="col-lg-5 col-md-6 mt-3 mt-lg-0 mx-25">
                    <h3 class="text-lg-end">
                        <span v-if="product.origin_price !== product.price"
                            class="text-decoration-line-through fs-6">
                            NT${{ $filters.currency(product.origin_price) }}<br>
                        </span>
                        <span>NT${{ $filters.currency(product.price) }}</span>
                            / {{ product.unit }}
                    </h3>
                </div>
                <div>
                    <button type="button" class="btn mt-2 me-2 button-light-color"
                     @click="updateFavorite(item)">
                     <span v-if="idList.every((id) => productId !== id)">
                      <i class="bi bi-heart" title="加入收藏"></i> 加入收藏
                     </span>
                     <span v-else><i class="bi bi-heart-fill" title="加入收藏"></i> 取消收藏</span>
                    </button>
                    <button type="button" class="btn button-light-color mt-2"
                      @click.prevent="addCart()">
                        <i class="bi bi-cart-plus-fill"></i> 加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="text-center m-5 text-deep-color">
        <h3>產品說明及保養</h3>
        <p class="mt-3 text-start">
          *避免直接陽光照射： 永生花束對陽光過於直接的照射較為敏感，因此請避免將花束暴露在強烈的陽光下，以防止花朵顏色褪色。<br>
          *避免潮濕環境： 請避免將花束放在潮濕的環境中，以免影響花材的質地和保持時間。<br>
          *定期吹塵： 您可以使用吹風機低溫吹風，輕輕將灰塵和污垢吹走，但請保持一定距離，避免對花朵造成損害。<br>
          *避免觸摸： 盡量避免觸摸花朵，以免油脂和污垢影響花材的外觀。<br>
          *乾燥環境： 若您的花束長時間處於潮濕環境，可以將其放在干燥通風處幾天，讓花朵恢復最佳狀態。<br>
        </p>
        <p class="mt-4 fs-5 text-danger">這束永生花束將成為您生活中的一份美麗，無論是用於裝飾空間，還是作為一份珍貴的禮物，都將持久地保留自然花朵的美感。<br>
          請按照以上保養指南，使這份美麗繼續陪伴您。</p>
    </div>
    <hr>
  </div>
</template>

<script>
import cartMixin from '@/mixins/GetCart'
import favoriteMixin from '@/mixins/GetFavorite'
export default {
  inject: ['emitter'],
  mixins: [cartMixin, favoriteMixin],
  data () {
    return {
      productId: '',
      product: {},
      product_qty: 1,
      idList: [],
      isLoading: false
    }
  },
  methods: {
    getProduct () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.productId}`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.product = res.data.product
          }
        })
    },
    addCart () {
      this.isLoading = true
      const cart = {
        product_id: this.productId,
        qty: this.product_qty
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: cart })
        .then((res) => {
          this.isLoading = false
          this.getCarts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '已加入購物車'
          })
        })
    },
    updateFavorite () {
      if (this.idList.every((id) => this.productId !== id)) {
        this.idList.push(this.productId)
        localStorage.setItem('favoriteItem', JSON.stringify(this.idList))
        this.emitter.emit('push-message', {
          style: 'success',
          title: '已新增至收藏'
        })
      } else {
        this.idList.indexOf(this.productId)
        this.idList.splice(this.idList.indexOf(this.productId), 1)
        localStorage.setItem('favoriteItem', JSON.stringify(this.idList))
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '已取消收藏'
        })
      }
      this.getFavorite()
    },
    reQty (num) {
      this.product_qty += (num)
    }
  },
  created () {
    this.productId = this.$route.params.productId
    this.getProduct()
    this.getFavorite()
  }
}
</script>
<style>
.breadcrumb{
    font-size: 20px;
}
.breadcrumb-text{
    color: rgb(47, 126, 40);
    text-decoration: none;
}
.breadcrumb-text:hover{
    color: pink;
}
.link-title{
    color: rgb(47, 126, 40) !important;
}
</style>
