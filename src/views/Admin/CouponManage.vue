<template>
    <div>
      <Loading :active="isLoading"></Loading>
      <div class="text-end mt-4">
        <button class="btn btn-primary" @click="openModal(true)">
          建立新的優惠券
        </button>
      </div>
      <table class="table mt-4">
        <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
            <span class="text-muted" v-else>未起用</span>
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
    </div>
    <CouponModal ref="couponModal"
    :coupon="tempCoupon" @update-coupon="updataCoupon"></CouponModal>
    <CheckModal ref="checkModal"
    :dataStatus="tempCoupon" @delete-confirmed="deleteCoupon"></CheckModal>
</template>
<script>
import CouponModal from '@/components/Admin/CouponModal.vue'
import CheckModal from '@/components/Admin/CheckModal.vue'
export default {
  components: {
    CouponModal,
    CheckModal
  },
  inject: ['emitter'],
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getCoupons () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          this.coupons = res.data.coupons
        })
    },
    updataCoupon (tempCoupon) {
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
        this.$http.post(api, { data: tempCoupon })
          .then((res) => {
            this.$refs.couponModal.hideModal()
            if (res.data.success) {
              this.getCoupons()
              this.emitter.emit('push-message', {
                style: 'success',
                title: '新增成功'
              })
            } else {
              this.emitter.emit('push-message', {
                style: 'danger',
                title: '新增失敗',
                content: res.data.message.join('、')
              })
            }
          })
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        this.$http.put(api, { data: tempCoupon })
          .then((res) => {
            this.$refs.couponModal.hideModal()
            if (res.data.success) {
              this.getCoupons()
              this.emitter.emit('push-message', {
                style: 'success',
                title: '編輯成功'
              })
            } else {
              this.emitter.emit('push-message', {
                style: 'danger',
                title: '編輯失敗',
                content: res.data.message.join('、')
              })
            }
          })
      }
    },
    deleteCoupon (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
      this.$http.delete(api)
        .then((res) => {
          this.isLoading = false
          this.$refs.checkModal.hideModal()
          this.getCoupons()
          console.log(res)
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除完成'
          })
        })
    },
    openModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.showModal()
    },
    openCheckModal (item) {
      this.tempCoupon = { ...item }
      this.$refs.checkModal.showModal()
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
