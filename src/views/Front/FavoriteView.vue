<template>
  <Loading :active="isLoading"></Loading>
  <section v-if="favoriteList.length === 0"  class="text-center my-5 py-5">
    <h2 class="noFavoriteList-title">尚未收藏任何產品喔!</h2>
    <button type="button" class="btn button-light-color mt-2"
        @click.prevent="$router.push('/products')">來去逛逛
    </button>
  </section>
  <section v-else>
    <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4" v-for="item in favoriteList" :key="item.id">
          <div class="card mt-1 mb-2 mx-auto">
            <a href="#" @click.prevent="getProduct(item.id)">
              <div class="overflow-hidden text-light position-relative border-bottom card-pic">
                <div class="position-absolute bg-secondary px-2 bottom-0 end-0 rounded m-1">
                  <p class="card-text">{{ item.category }}</p>
                </div>
                <img :src="item.imageUrl" :alt="item.title"
                  class="card-img-top d-block align-middle w-100  w-auto mx-auto">
              </div>
              <div class="card-body text-dark">
                <div>
                  <h3 class="row overflow-hidden">
                    <div class="card-title col-10 overflow-hidden">
                      {{ item.title }}
                    </div>
                    <div class="mw-25 text-end col-2 add-favorite">
                      <a href="#" @click.stop.prevent="removeFavorite(item)">
                        <i class="bi bi-heart text-danger"
                        v-if="idList.every((id) => item.id !== id)"></i>
                        <i class="bi bi-heart-fill text-danger"
                        v-else></i>{{ null }}
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
  </section>
</template>
<script>
import cartMixin from '@/mixins/GetCart'
import favoriteMixin from '@/mixins/GetFavorite'

export default {
  inject: ['emitter'],
  mixins: [cartMixin, favoriteMixin],
  data () {
    return {
      favoriteList: [],
      status: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  methods: {
    getFavoriteProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            const productList = res.data.products
            const category = []
            this.favoriteList = []
            productList.forEach((item) => {
              category.push(item.category)
              if (this.idList.some((id) => item.id === id)) {
                this.favoriteList.push(item)
              }
            })
          }
        })
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
    removeFavorite (item) {
      this.idList.indexOf(item.id)
      this.idList.splice(this.idList.indexOf(item.id), 1)
      localStorage.setItem('favoriteItem', JSON.stringify(this.idList))
      this.getFavoriteProducts()
      this.emitter.emit('push-message', {
        style: 'danger',
        title: '已取消收藏'
      })
    },
    getProduct (id) {
      this.$router.push(`/products/${id}`)
    }
  },
  created () {
    this.getFavoriteProducts()
    this.getFavorite()
  }
}
</script>
<style>
.noFavoriteList-title{
  font-weight: bold;
  color: brown;
}
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
