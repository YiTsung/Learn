<template>
  <DashNavbar></DashNavbar>
  <div class="container-fluid mt-3 position-relative">
    <router-view/>
  </div>
</template>

<script>
import DashNavbar from '@/components/Admin/DashNavbar.vue'

export default {
  components: {
    DashNavbar
  },
  inject: ['emitter'],
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (!token) {
      this.$router.push('/login')
    } else {
      this.$http.defaults.headers.common.Authorization = token
      const api = `${process.env.VUE_APP_API}api/user/check`
      this.$http.post(api, this.user)
        .then((res) => {
          if (!res.data.success) {
            this.$router.push('/login')
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '登入失敗'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'success',
              title: '登入成功'
            })
          }
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data
          })
          this.$router.push('/login')
        })
    }
  }
}
</script>
