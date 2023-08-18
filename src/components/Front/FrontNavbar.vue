<template>
    <Loading :active="isLoading"></Loading>
    <nav class="navbar navbar-expand-md header fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img alt="logo" src="@/assets/logo.png" width="100" height="60">
        </a>
        <div class="d-flex">
          <router-link to="/login" class="nav-link fs-3 p-1 d-md-none me-2">
            <i class="bi bi-person-fill"></i>
          </router-link>
          <router-link to="/favorite" class="nav-link fs-3 p-1 me-2 d-md-none position-relative">
              <i class="bi bi-suit-heart-fill"></i>
              <span v-if="favoriteLength"
              class="position-absolute start-50 badge rounded-pill bg-danger p-1 cart-icon"
              >{{ favoriteLength }}</span>
          </router-link>
          <router-link to="/userCart" class="nav-link fs-3 p-1 me-3 d-md-none position-relative">
            <i class="bi bi-cart4"></i>
            <span v-if="cartLength"
              class="position-absolute start-50 badge rounded-pill bg-danger p-1 cart-icon"
              >{{ cartLength }}</span>
          </router-link>
          <button ref="navbarToggler" class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
          <div class="navbar-nav fw-bold">
            <router-link to="/products" class="nav-link fs-5" @click.prevent="closeNav">商品</router-link>
          </div>
          <div class="navbar-nav fw-bold">
            <router-link to="/QA" class="nav-link fs-5" @click.prevent="closeNav">常見問題</router-link>
          </div>
        </div>
        <router-link to="/login" class="nav-link fs-3 p-1 me-2 d-none d-md-block">
            <i class="bi bi-person-fill"></i>
        </router-link>
        <router-link to="/favorite" class="nav-link fs-3 p-1 me-2 d-none d-md-block position-relative">
              <i class="bi bi-suit-heart-fill"></i>
              <span v-if="favoriteLength"
              class="position-absolute start-50 badge rounded-pill bg-danger p-1 cart-icon"
              >{{ favoriteLength }}</span>
        </router-link>
        <router-link to="/userCart" class="nav-link fs-3 p-1 d-none d-md-block position-relative">
            <i class="bi bi-cart4"></i>
            <span v-if="cartLength"
              class="position-absolute start-50 badge rounded-pill bg-danger p-1 cart-icon"
              >{{ cartLength }}</span>
        </router-link>
      </div>
    </nav>
</template>

<script>
import cartMixin from '@/mixins/GetCart'
import favoriteMixin from '@/mixins/GetFavorite'
export default {
  inject: ['emitter'],
  mixins: [cartMixin, favoriteMixin],
  data () {
    return {
      isLoading: false,
      cartLength: '0',
      favoriteLength: '0'
    }
  },
  methods: {
    closeNav () {
      this.$refs.navbarToggler.click()
    }
  },
  created () {
    this.getCarts()
    this.getFavorite()
  },
  mounted () {
    this.emitter.on('push-CartNotice', (data) => {
      this.cartLength = data.data
    })
    this.emitter.on('push-FavNotice', (data) => {
      this.favoriteLength = data.data
    })
  }
}
</script>
<style>
.header{
  background: #e7eeea;
}
.nav-link{
  color: #37523d;
  font-weight: bold;
}
.nav-link:hover{
  box-shadow: 0 4px #607665;
  color: #37523d;
}
.cart-icon{
  font-size: 10px;
  width: 20px;
  height: 15px;
}
</style>
