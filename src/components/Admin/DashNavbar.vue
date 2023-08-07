<template>
  <Loading :active="isLoading"></Loading>
  <nav class="navbar navbar-expand-lg header">
    <div class="container-fluid">
      <a class="navbar-brand nav-link" href="#">回到官網</a>
      <button class="navbar-toggler" type="button"
        data-bs-toggle="collapse" data-bs-target=".DashNav"
        aria-controls="DashNav" aria-expanded="false"
        aria-label="Toggle navigation" ref="navbarToggler">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse DashNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center text-center">
          <li class="nav-item">
            <router-link to="/dashboard/ProductManage" class="nav-link dashNav-item"
            @click.prevent="closeNav">產品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/OrderManage" class="nav-link dashNav-item"
            @click.prevent="closeNav">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/CouponManage" class="nav-link dashNav-item"
            @click.prevent="closeNav">優惠券管理</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link dashNav-item dashNav-item" href="#"
            @click.prevent="openModal">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <CheckModal ref="checkModal" :dataStatus="'logout'"
  @logout-confirmed="logout"></CheckModal>
</template>

<script>
import CheckModal from '@/components/Admin/CheckModal.vue'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    logout () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.$router.push('/login')
            this.$refs.checkModal.hideModal()
          }
        })
    },
    openModal () {
      this.$refs.checkModal.showModal()
    },
    closeNav () {
      this.$refs.navbarToggler.click()
    }
  },
  components: {
    CheckModal
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
</style>
