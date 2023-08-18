export default {
  inject: ['emitter'],
  methods: {
    getCarts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            this.cartLength = res.data.data.carts.length
            this.emitter.emit('push-CartNotice', {
              data: this.cartLength
            })
          }
        })
    }
  }
}
