<template>
  <ToastList></ToastList>
  <router-view/>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastList from '@/components/ToastList.vue'
import 'bootstrap/dist/js/bootstrap.bundle'

export default {
  provide () {
    return {
      emitter
    }
  },
  components: {
    ToastList
  }
}
</script>
<style lang="scss">
@import "./assets/all"
</style>
