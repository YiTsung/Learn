<template>
    <FrontNavbar></FrontNavbar>
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <FrontFotter></FrontFotter>
</template>

<script>
// @ is an alias to /src
import FrontNavbar from '@/components/Front/FrontNavbar.vue'
import FrontFotter from '@/components/Front/FontFooter.vue'
export default {
  components: {
    FrontNavbar,
    FrontFotter
  },
  inject: ['emitter']
}
</script>
<style>
body{
  height: 100%;
}
.wrapper{
  margin-top:45px ;
  min-height: calc(100vh - 190px);
}
</style>
