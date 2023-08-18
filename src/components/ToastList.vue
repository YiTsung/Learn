<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <ToastMessage v-for="(msg, key) in messages" :key="key"
        :msg="msg"
      />
    </div>
  </template>

<script>
import ToastMessage from '@/components/ToastMessage.vue'

export default {
  data () {
    return {
      messages: []
    }
  },
  components: {
    ToastMessage
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>
