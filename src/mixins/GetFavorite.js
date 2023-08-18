export default {
  methods: {
    getFavorite () {
      if (localStorage.getItem('favoriteItem')) {
        const tempList = localStorage.getItem('favoriteItem')
        this.idList = JSON.parse(tempList)
        this.favoriteLength = this.idList.length
      } else {
        this.idList = []
        this.favoriteLength = 0
      }
      this.emitter.emit('push-FavNotice', {
        data: this.favoriteLength
      })
    }
  }
}
