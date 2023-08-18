<template>
    <Loading :active="isLoading"></Loading>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
        <template v-for="(item,key) in orderList" :key="key">
          <tr v-if="orderList.length" :class="{'text-secondary': !item.is_paid}" >
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid">
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">檢視</button>
                <button class="btn btn-outline-danger btn-sm" @click="openCheckModal(item)">刪除</button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <OrderModal ref="orderModal"
    :order="tempOrder"></OrderModal>
    <CheckModal ref="checkModal"
    :dataStatus="tempOrder" @delete-confirmed="deleteOrder"></CheckModal>
    <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
</template>

<script>
import OrderModal from '@/components/Admin/OrderModal.vue'
import CheckModal from '@/components/Admin/CheckModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  inject: ['emitter'],
  data () {
    return {
      orderList: {},
      pagination: {},
      tempOrder: {},
      currentPage: 1,
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.orderList = res.data.orders
            this.pagination = res.data.pagination
          }
        })
    },
    deleteOrder (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      this.$http.delete(api)
        .then((res) => {
          this.isLoading = false
          this.$refs.checkModal.hideModal()
          this.getOrders(this.currentPage)
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除完成'
          })
        })
    },
    openModal (item) {
      this.tempOrder = { ...item }
      this.$refs.orderModal.showModal()
    },
    openCheckModal (item) {
      this.tempOrder = { ...item }
      this.$refs.checkModal.showModal()
    }
  },
  components: {
    OrderModal,
    Pagination,
    CheckModal
  },
  created () {
    this.getOrders()
  }
}
</script>
