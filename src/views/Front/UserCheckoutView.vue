<template>
    <Loading :active="isLoading"></Loading>
    <section class="mt-3">
        <div class="container">
            <div class="row justify-content-center align-items-center position-relative mt-5">
                <div class="col-10">
                    <div class="progress mx-3" style="height: 5px;">
                        <div class="progress-bar bg-info" role="progressbar"  style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="col-10 d-flex justify-content-between position-absolute top-0 translate-middle-y mt-3">
                    <div class="text-center">
                        <span class="badge bg-brown rounded-circle p-2 " style="width: 2rem; height:2rem;">
                            <i class="bi bi-basket"></i>
                        </span>
                        <p class="mb-0">購物車</p>
                    </div>
                    <div class="text-center">
                        <span class="badge bg-brown rounded-circle p-2" style="width: 2rem; height: 2rem;">
                            <i class="bi bi-clipboard-check-fill"></i>
                        </span>
                        <p class="mb-0">填寫資料</p>
                    </div>
                    <div class="text-center">
                        <span class="badge bg-brown rounded-circle p-2" style="width: 2rem; height: 2rem;">
                            <i class="bi bi-credit-card-fill"></i>
                        </span>
                        <p class="mb-0">付款確認</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="my-7">
        <div class="container">
            <div class="border p-3 p-md-5">
                <div class="row justify-content-center">
                    <form class="col-12 col-lg-8 py-3 text-brown">
                        <h2 class="fs-3"><i class="bi bi-c-circle"></i>購物清單</h2>
                        <table class="table align-middle mt-3">
                            <thead>
                                <tr>
                                    <th class="table-title">品名</th>
                                    <th class="text-end table-title">數量</th>
                                    <th class="text-end table-title">小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in order.products" :key="item.id">
                                    <td>{{ item.product.title }}</td>
                                    <td class="text-end">{{ item.qty }}/{{ item.product.unit }}</td>
                                    <td class="text-end">{{  $filters.currency(item.product.price) }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="w-100">
                            <tbody>
                                <tr>
                                    <td class="text-end py-2">運費</td>
                                    <td class="text-end w-50">NT$ {{ $filters.currency(freight) }}</td>
                                </tr>
                                <tr class="border-top border-dark">
                                    <td class="text-end py-2">總計金額</td>
                                    <td class="text-end w-50">NT$ {{ $filters.currency(order.total + freight) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <form class="col-12 col-lg-8 mt-3">
                        <h2 class="fs-3 text-brown"><i class="bi bi-c-circle"></i>收件人資料</h2>
                        <table class="table border mt-3 border-dark">
                            <tbody>
                                <tr>
                                    <th width="100" class="table-title">Email</th>
                                    <td>{{ order.user.email }}</td>
                                </tr>
                                <tr>
                                    <th class="table-title">姓名</th>
                                    <td>{{ order.user.name }}</td>
                                </tr>
                                <tr>
                                    <th class="table-title">收件人電話</th>
                                    <td>{{ order.user.tel }}</td>
                                </tr>
                                <tr>
                                    <th class="table-title">收件人地址</th>
                                    <td>{{ order.user.address }}</td>
                                </tr>
                                <tr>
                                    <th class="table-title">付款狀態</th>
                                    <td>
                                        <span v-if="!order.is_paid" >尚未付款</span>
                                        <span v-else class="text-success">付款完成</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="text-end" v-if="order.is_paid === false">
                            <button type="button" class="btn btn-brown" @click="payOrder">確認付款</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  data () {
    return {
      orderId: '',
      order: {
        user: {}
      },
      freight: 60, // 運費
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.order = res.data.order
          }
        })
    },
    payOrder () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.getOrder()
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '付款成功',
              showConfirmButton: false,
              timer: 3000
            })
            setTimeout(() => this.$router.push('/products'), 3500)
          }
        })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
<style>
.bg-brown{
    background: rgb(156, 44, 44);
}
.text-brown{
    color:  rgb(160, 31, 31);
}
.table-title{
    background:  rgb(247, 223, 223) !important;
}
.btn-brown{
    border: 1px solid rgb(160, 31, 31);
}
.btn-brown:hover{
    background: rgb(160, 31, 31);
    color: white;
}
</style>
