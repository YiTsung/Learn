<template>
  <br>
  <ToastList></ToastList>
  <router-view/>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastList from '@/components/ToastList.vue'
import 'bootstrap/dist/js/bootstrap.bundle'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  provide () {
    return {
      emitter
    }
  },
  components: {
    ToastList
  },
  created () {
    AOS.init({ })
  }
}
</script>
<style lang="scss">
@import "./assets/all"
</style>
