<template>
  <Loading :active="isLoading"></Loading>
    <div class="text-end">
        <button class="btn btn-primary" type="button"
        @click="openModal(true)">
        新增產品
        </button>
    </div>
  <table class="table mt-4">
    <thead>
        <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col">原價</th>
        <th scope="col">售價</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item) in productList" :key="item.id">
        <td scope="row">{{ item.category}}</td>
        <td>{{ item.title }}</td>
        <td>
            {{$filters.currency(item.origin_price)}}
        </td>
        <td>
            {{$filters.currency(item.price)}}
        </td>
        <td>
            <span  v-if="item.is_enabled" class="text-success" >啟用</span>
            <span  v-else class="text-muted" >未啟用</span>
        </td>
        <td>
            <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openCheckModal(item)">刪除</button>
            </div>
        </td>
        </tr>
    </tbody>
  </table>
  <ProductModal ref="productModal"
  :ProductItem="tempProduct" @update-product="updatProduct"></ProductModal>
  <CheckModal ref="checkModal"
  :dataStatus="tempProduct" @delete-confirmed="deleteProduct"></CheckModal>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
</template>

<script>
import ProductModal from '@/components/Admin/ProductModal.vue'
import CheckModal from '@/components/Admin/CheckModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  inject: ['emitter'],
  data () {
    return {
      productList: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.productList = res.data.products
            this.pagination = res.data.pagination
          }
        })
    },
    updatProduct (item) {
      this.isLoading = true
      this.tempProduct = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          this.isLoading = false
          this.$refs.productModal.hideModal()
          if (res.data.success) {
            this.getProducts()
            if (!this.isNew) {
              this.emitter.emit('push-message', {
                style: 'success',
                title: '編輯成功'
              })
            } else {
              this.emitter.emit('push-message', {
                style: 'success',
                title: '新增成功'
              })
            }
          } else {
            if (!this.isNew) {
              this.emitter.emit('push-message', {
                style: 'danger',
                title: '編輯失敗',
                content: res.data.message.join('、')
              })
            } else {
              this.emitter.emit('push-message', {
                style: 'danger',
                title: '新增失敗',
                content: res.data.message.join('、')
              })
            }
          }
        })
    },
    deleteProduct (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      this.$http.delete(api)
        .then((res) => {
          this.isLoading = false
          this.$refs.checkModal.hideModal()
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除完成'
          })
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    openCheckModal (item) {
      this.tempProduct = { ...item }
      this.$refs.checkModal.showModal()
    }
  },
  components: {
    ProductModal,
    CheckModal,
    Pagination
  },
  created () {
    this.getProducts()
  }
}
</script>
<style>

</style>
