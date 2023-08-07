<template>
 <Loading :active="isLoading"></Loading>
 <section class="mt-3">
    <div class="container">
        <div class="row justify-content-center align-items-center position-relative mt-5">
            <div class="col-10">
                <div class="progress mx-3" style="height: 5px;">
                    <div class="progress-bar bg-info" role="progressbar"  style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
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
                    <span class="badge bg-secondary rounded-circle p-2" style="width: 2rem; height: 2rem;">
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
 <section v-if="!cartQty" class="my-7">
    <div class="container">
        <div class="border border-2 rounded-1 px-2 py-5 null-box">
            <h2 class="null-title">購物清單目前尚無選購商品哦！</h2>
            <router-link to="/products" class="null-btn">來去逛逛吧！</router-link>
        </div>
    </div>
 </section>
 <section v-else class="my-7">
    <div class="container">
        <div class="border border-2 p-3">
            <div class="row row-cols-1 g-5 mx-0 justify-content-center">
                <div class="col-12 col-lg-8 py-3 px-0 table-responsive">
                    <div class="px-2 text-brown">
                        <h2 class="fs-3"><i class="bi bi-c-circle"></i>購物清單</h2>
                    </div>
                    <table class="table align-middle mt-3">
                        <thead class="table-beige text-brown text-nowrap">
                          <tr>
                            <th style="width: 50px;"></th>
                            <th class="ps-3" style="width: 75px;">商品</th>
                            <th style="width: 200px;"></th>
                            <th class="text-end" style="width: 100px;">單價</th>
                            <th class="text-end" style="width: 100px;">數量</th>
                            <th class="text-end" style="width: 120px;">小計</th>
                          </tr>
                        </thead>
                        <tbody class="text-nowrap text-brown" v-for="item in carts.carts" :key="item.id">
                            <tr>
                                <td>
                                    <button type="button" class="btn btn btn-outline-danger btn-sm"
                                    @click.prevent="delCart (item)">
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                                <td>
                                    <img :src="item.product.imageUrl" alt="item.product.title"
                                        style="width: 100px; height: 75px; background-size: cover; background-position: center">
                                </td>
                                <td>
                                    {{ item.product.title }}
                                </td>
                                <td class="text-end">
                                    NT$ {{ $filters.currency(item.product.price) }}
                                </td>
                                <td>
                                    <input type="number"
                                        class="form-control form-control-sm ms-auto"
                                        v-model.number="item.qty"
                                        min="1" max="15" @change="updataCart(item)"
                                        style="width: 60px;">
                                </td>
                                <td class="text-end">
                                    NT$ {{ $filters.currency(item.total) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 col-lg-8 p-0 d-flex flex-column">
                    <div class="px-1 text-brown">
                        <h2 class="fs-3"><i class="bi bi-c-circle"></i>購物車總計</h2>
                    </div>
                    <div class="col-12 col-md-6 ms-auto">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control bg-beige text-brown border-1 border-dark" placeholder="請輸入優惠碼" aria-describedby="coupon-code"
                                    v-model="couponCode">
                            <button class="btn btn-outline-dark" type="button" id="coupon-code"
                                @click="addCouponCode()"    >套用優惠卷</button>
                        </div>
                    </div>
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
                    <div class="mt-4 col-12 col-md-2 mx-auto">
                        <button type="button"  class="btn btn-primary rounded-3 w-100"
                        @click="toCheckinfo">填寫資料</button>
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
      couponCode: '',
      freight: 60, // 運費
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
            this.emitter.emit('push-message', {
              style: 'danger',
              title: res.response.data.message
            })
          }
        })
    },
    updataCart (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.id,
        qty: item.qty
      }
      this.$http.put(api, { data: cart })
        .then((res) => {
          this.isLoading = false
          this.getCart()
        })
        .catch((error) => {
          this.isLoading = false
          this.emitter.emit('push-message', {
            style: 'danger',
            title: error.response.data.message
          })
        })
    },
    delCart (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.delete(api)
        .then((res) => {
          this.isLoading = false
          this.getCart()
        })
    },
    addCouponCode () {
      this.isLoading = true
      const coupon = {
        code: this.couponCode
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      this.$http.post(api, { data: coupon })
        .then((res) => {
          this.couponCode = ''
          if (res.data.success) {
            this.isLoading = false
            this.emitter.emit('push-message', {
              style: 'success',
              title: '套用優惠券成功'
            })
            this.getCart()
          } else {
            this.isLoading = false
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '套用優惠券失敗',
              content: res.data.message
            })
          }
        })
    },
    toCheckinfo () {
      this.$router.push('/userCheckinfo')
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
.null-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.null-title{
    font-weight: bold;
    color: rgb(207, 125, 125);
}
.null-btn{
    color: rgb(207, 125, 125);
    width: 10em;
    padding: 5px;
    margin-top: 2em;
    text-align: center;
    display: block;
    text-decoration: none;
    border: 1px solid rgb(207, 125, 125);
    border-radius: 15px ;
}
.null-btn:hover{
    color: white;
    background:  rgb(207, 125, 125);
}
</style>
