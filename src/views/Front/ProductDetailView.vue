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
                    <button type="button" class="btn mt-2 me-2 button-light-color">
                        <span>
                            <i class="bi bi-heart" title="加入收藏"></i> 加入收藏
                        </span>
                        <span><i class="bi bi-heart-fill" title="加入收藏"></i> 取消收藏</span>
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
    </div>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  data () {
    return {
      id: '',
      product: {},
      product_qty: 1,
      isLoading: false
    }
  },
  methods: {
    getProduct () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
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
        product_id: this.id,
        qty: this.product_qty
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: cart })
        .then((res) => {
          this.isLoading = false
          this.emitter.emit('push-message', {
            style: 'success',
            title: '已加入購物車'
          })
        })
    },
    reQty (num) {
      this.product_qty += (num)
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
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
