<template>
 <Loading :active="isLoading"></Loading>
 <section class="mt-3">
    <div class="container">
        <div class="row justify-content-center align-items-center position-relative mt-5">
            <div class="col-10">
                <div class="progress mx-3" style="height: 5px;">
                    <div class="progress-bar bg-info" role="progressbar"  style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
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
                    <span class="badge bg-secondary rounded-circle p-2" style="width: 2rem; height: 2rem;">
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
        <div class="row g-3 my-4 flex-lg-row-reverse">
            <div class="col-12 col-lg-6 text-brown">
                <div class="border border-2 p-3 p-md-4">
                    <div class="row row-cols-1 g-5">
                        <div class="col">
                            <h2 class="fs-3"><i class="bi bi-c-circle"></i>購物清單</h2>
                            <div class="row flex-column g-3 mt-3">
                                <div class="col-10" v-for="item in carts.carts" :key="item.id">
                                    <div class="card border-0">
                                        <div class="row">
                                            <div class="col-md-5">
                                                <img
                                                    class="img-fluid"
                                                    :src="item.product.imageUrl"
                                                    :alt="item.product.title"
                                                />
                                            </div>
                                            <div class="col-md-5">
                                                <div class="card-body p-0 text-brown">
                                                    <h4 class="card-title fw-bold">{{ item.product.title }}</h4>
                                                    <p class="card-text">數量：{{ item.qty }}</p>
                                                    <p class="card-text">NT$ {{ item.product.price }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col d-flex flex-column justify-content-between">
                            <div class="carts-total">
                                <h2 class="fs-3"><i class="bi bi-c-circle"></i>購物車總計</h2>
                                <table class="mt-1 w-100">
                                    <tbody class="text-brown">
                                        <tr>
                                            <td class="text-end py-2" colspan="3">共 {{ cartQty }} 筆商品</td>
                                        </tr>
                                        <tr>
                                            <td class="text-end py-2" colspan="2">商品金額</td>
                                            <td class="text-end w-50">NT$ {{ $filters.currency(carts.total) }}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-end py-2" colspan="2">運費</td>
                                            <td class="text-end w-50">NT$ {{ $filters.currency(freight) }}</td>
                                        </tr>
                                        <tr class="text-success">
                                            <td class="text-end py-2" colspan="2">優惠折扣</td>
                                            <td class="text-end w-50">- NT$ {{ $filters.currency(carts.total - carts.final_total) }}</td>
                                        </tr>
                                        <tr class="border-top  border-dark">
                                            <td class="text-end py-2" colspan="2">總計金額</td>
                                            <td class="text-end w-50">NT$ {{ $filters.currency(carts.final_total + freight)}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 text-brown">
                <div class="border border-2 p-3 p-md-4">
                    <div class="row g-5">
                        <div class="col-12">
                            <h2 class="fs-3"><i class="bi bi-c-circle"></i>收件人資料</h2>
                            <VForm class="row flex-column g-3 mt-3" @submit="createOrder" v-slot="{ errors }">
                                <div class="col">
                                    <label for="userName" class="form-label">*收件人姓名</label>
                                    <VField
                                    id="userName"
                                    type="text"
                                    name="姓名"
                                    class="form-control border-brown text-brown"
                                    placeholder="請輸入姓名"
                                    :class="{ 'is-invalid': errors['姓名'] }"
                                    rules="required"
                                    v-model="form.user.name"></VField>
                                    <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                                </div>
                                <div class="col">
                                    <label for="userEmail" class="form-label">*Email</label>
                                    <VField
                                    id="userEmail"
                                    type="email"
                                    name="Email"
                                    class="form-control border-brown text-brown"
                                    placeholder="請輸入Email"
                                    :class="{ 'is-invalid': errors['Email'] }"
                                    rules="required"
                                    v-model="form.user.email"></VField>
                                    <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
                                </div>
                                <div class="col">
                                    <label for="userTel" class="form-label">*收件人電話</label>
                                    <VField
                                    id="userTel"
                                    type="tel"
                                    name="電話"
                                    class="form-control border-brown text-brown"
                                    placeholder="請輸入電話"
                                    :class="{ 'is-invalid': errors['電話'] }"
                                    rules="required"
                                    v-model="form.user.tel"></VField>
                                    <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                                </div>
                                <div class="col">
                                    <label for="userAddress" class="form-label">*收件人地址</label>
                                    <VField
                                    id="userAddress"
                                    type="text"
                                    name="地址"
                                    class="form-control border-brown text-brown"
                                    placeholder="請輸入地址"
                                    :class="{ 'is-invalid': errors['地址'] }"
                                    rules="required"
                                    v-model="form.user.address"></VField>
                                    <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                                </div>
                                <div class="col">
                                    <label for="userMessage" class="form-label">留言</label>
                                    <textarea style="resize: none;"
                                    class="form-control border-brown text-brown"
                                    rows="5"
                                    v-model="form.message"></textarea>
                                </div>
                                <div class="col d-flex justify-content-end">
                                    <button
                                    type="submit"
                                    class="btn btn-primary rounded-3">
                                    前往結帳
                                    </button>
                                </div>
                            </VForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </section>
</template>

<script>
export default {
  inject: ['emitter'],
  data () {
    return {
      carts: {},
      cartQty: 0,
      freight: 60, // 運費
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false
    }
  },
  methods: {
    getCart () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.carts = res.data.data
            this.cartQty = res.data.data.carts.length
          } else {
            this.isLoading = false
            this.emitter.emit('push-message', {
              style: 'danger',
              title: res.response.data.message
            })
          }
        })
    },
    createOrder () {
      this.isLoading = true
      const order = this.form
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      this.$http.post(api, { data: order })
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.$router.push(`/userCheckout/${res.data.orderId}`)
            this.form = {
              user: {
                name: '',
                email: '',
                tel: '',
                address: ''
              },
              message: ''
            }
          }
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: error.response.data
          })
        })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
<style>
.bg-brown{
    background: rgb(156, 44, 44);
}
.text-brown{
    color:  rgb(160, 31, 31);;
}
</style>
