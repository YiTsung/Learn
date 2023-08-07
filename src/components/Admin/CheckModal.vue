<template>
    <div class="modal fade" id="exampleModal" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true"
      ref="modal" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">請確認</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否
            <span v-if="dataStatus === 'logout'">登出</span>
            <span v-else>刪除{{ dataStatus.title }}</span>
              ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="statusConfirmed">確認</button>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: ['dataStatus'],
  mixins: [modalMixin],
  methods: {
    statusConfirmed () {
      if (this.dataStatus === 'logout') {
        this.$emit('logout-confirmed')
      }
      this.$emit('delete-confirmed', this.dataStatus)
    }
  }
}
</script>
