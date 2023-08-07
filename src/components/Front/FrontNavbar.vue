<template>
    <Loading :active="isLoading"></Loading>
    <nav class="navbar navbar-expand-md header">
      <div class="container">
        <a class="navbar-brand nav-link" href="#">
          回到官網
        </a>
        <div class="d-flex">
          <router-link to="/login" class="nav-link fs-3 p-1 d-md-none me-2">
            <i class="bi bi-person-fill"></i>
          </router-link>
          <router-link to="/" class="nav-link fs-3 p-1 me-2 d-md-none position-relative">
              <i class="bi bi-suit-heart-fill"></i>
          </router-link>
          <router-link to="/userCart" class="nav-link fs-3 p-1 me-3 d-md-none position-relative">
            <i class="bi bi-cart4"></i>
            <span v-if="cartQty"
              class="position-absolute start-50 badge rounded-pill bg-danger p-1 cart-icon"
              >{{ cartQty }}</span>
          </router-link>
          <button ref="navbarToggler" class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
          <div class="navbar-nav fw-bold">
            <router-link to="/products" class="nav-link fs-5" @click.prevent="closeNav">商品</router-link>
          </div>
        </div>
        <router-link to="/login" class="nav-link fs-3 p-1 me-2 d-none d-md-block">
            <i class="bi bi-person-fill"></i>
        </router-link>
        <router-link to="/" class="nav-link fs-3 p-1 me-2 d-none d-md-block position-relative">
              <i class="bi bi-suit-heart-fill"></i>
        </router-link>
        <router-link to="/userCart" class="nav-link fs-3 p-1 d-none d-md-block position-relative">
            <i class="bi bi-cart4"></i>
            <span v-if="cartQty"
              class="position-absolute start-50 badge rounded-pill bg-danger p-1 cart-icon"
              >{{ cartQty }}</span>
        </router-link>
      </div>
    </nav>
</template>

<script>
export default {
  inject: ['emitter'],
  data () {
    return {
      isLoading: false,
      cartQty: ''
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.cartQty = res.data.data.carts.length
          }
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: error.response.data.message
          })
        })
    },
    closeNav () {
      this.$refs.navbarToggler.click()
    }
  },
  created () {
    this.getCart()
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
