<template>
    <div class="NotFound text-center row align-items-center">
      <div class="PageNotFoundText display-1">
        <p>404</p>
        <p>Page Not Found</p>
        <button class="btn" type="button"
          @click.prevent="$router.push('/')">回到 preserved flower 首頁</button>
      </div>
    </div>
</template>

<style>
.NotFound{
  height: calc(100vh);
  color:rgb(88, 22, 22);
  background-position:center;
  background: url(@/assets/404NoFound.png)no-repeat center / cover;
  text-transform: uppercase;
}
.NotFound p{
  font-weight: 800;
}
.NotFound button{
  background:pink;
}
.NotFound button:hover{
  background: rgb(245, 138, 138);
}
</style>
