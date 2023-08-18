<template>
 <Loading :active="isLoading"></Loading>
 <div class="container mt-5">
  <div class="row g-3">
    <div class="side-bar col-lg-2">
      <div class="text-center d-flex flex-md-column justify-content-center">
        <button v-for="item in categoryList" :key="item.value"
            class="btn btn-outline-success me-1 me-md-0 mb-md-1 py-md-2 text-nowrap" type="button"
            @click="filterProducts(item.value)"
            :class="{ active: item.value === this.currentCategory }">
              {{ item.value }}
        </button>
      </div>
    </div>
    <div class="col-lg-10 row ms-0">
      <div class="col-sm-12 col-md-6 col-lg-4"
      v-for="item in tempProduct" :key="item.id">
        <div class="card mt-1 mb-2 mx-auto">
          <a href="#" @click.prevent="getProduct(item.id)">
            <div class="overflow-hidden text-light position-relative border-bottom card-pic">
              <div class="position-absolute bg-secondary px-2 bottom-0 end-0 rounded m-1">
                <p class="card-text">{{item.category}}</p>
              </div>
              <img :src="item.imageUrl" :alt="item.title"
              class="card-img-top d-block align-middle w-100  w-auto mx-auto">
            </div>
            <div class="card-body text-dark">
              <div>
                <h3 class="row overflow-hidden">
                  <div class="card-title col-10 overflow-hidden">
                    {{item.title}}
                  </div>
                  <div class="mw-25 text-end col-2 add-favorite">
                    <a href="#"  @click.stop.prevent="updateFavorite(item)">
                      <i class="bi bi-heart text-danger" title="加入收藏"
                      v-if="idList.every((id) => item.id !== id)"></i>
                      <i class="bi bi-heart-fill text-danger" title="移除收藏" v-else></i>{{ null }}
                    </a>
                  </div>
                </h3>
              </div>
              <p class="card-text card-price">
                  <span class="text-decoration-line-through fs-6"
                  v-if="item.origin_price !== item.price">
                    NT${{$filters.currency(item.origin_price) }}
                  </span>
                  <span class="fs-5"> NT${{$filters.currency(item.price)}}</span>
              </p>
            </div>
          </a>
          <div class="card-footer">
            <button type="button" class="btn button-light-color w-100"
              @click.prevent="addCart(item.id)">
              <div class="spinner-border text-light spinner-border-sm" role="status"
              v-if="this.status.loadingItem ===item.id">
                <span class="visually-hidden">Loading...</span>
              </div>
              <i class="bi bi-cart-plus" v-else></i>加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      idList: [],
      products: [],
      tempProduct: {},
      isLoading: false,
      currentCategory: '全部',
      status: {
        loadingItem: ''
      },
      categoryList: [
        { value: '全部' },
        { value: '桌花' },
        { value: '永生花束' },
        { value: '花藝燈' }
      ]
    }
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.products = res.data.products
            this.tempProduct = this.products
          }
        })
    },
    getProduct (id) {
      this.$router.push(`/products/${id}`)
    },
    updateFavorite (item) {
      if (this.idList.every((id) => item.id !== id)) {
        this.idList.push(item.id)
        localStorage.setItem('favoriteItem', JSON.stringify(this.idList))
        this.emitter.emit('push-message', {
          style: 'success',
          title: '已新增至收藏'
        })
      } else {
        this.idList.indexOf(item.id)
        this.idList.splice(this.idList.indexOf(item.id), 1)
        localStorage.setItem('favoriteItem', JSON.stringify(this.idList))
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '已取消收藏'
        })
      }
      this.getFavorite()
    },
    addCart (id) {
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''
          this.getCarts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '已加入購物車'
          })
        })
    },
    filterProducts (value) {
      this.isLoading = true
      this.currentCategory = value
      setTimeout(() => {
        if (value === '全部') {
          this.tempProduct = this.products
          this.isLoading = false
        } else {
          this.tempProduct = this.products.filter((item) => {
            return item.category === value
          })
          this.isLoading = false
        }
      }, 1000)
    }
  },
  created () {
    this.getProducts()
    this.getFavorite()
  }
}
</script>
<style>
.card{
  max-width: 350px
}
.card a{
  text-decoration: none;
}
.card-pic img{
  height: 350px;
  object-fit: contain;
  transform:scale(1,1);
  transition: all 1s;
}
.card-pic img:hover{
  transform:scale(1.2,1.2);
}
.add-favorite{
  font-size: 30px;
  transition: all 0.5s;
}
.add-favorite:hover{
  transform:scale(1.2,1.2);
}
.card-price{
  color: black;
  font-weight: bold;
}
.button-light-color{
    background-color: #f8a0a0;
    color: black;
    font-weight:bold;
}
.button-light-color:hover{
  background-color: #f1b8b8;
}
</style>
