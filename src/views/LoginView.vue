<template>
 <div class="login w-100 row align-items-center m-0">
    <form class="row justify-content-center"
      @submit.prevent="logIn">
        <div class="warp col-md-6">
            <button type="button" class="login-btn">
                <router-link class="home-link" aria-current="page" to="/">
                    <span class="h5 mb-3">回首頁</span>
                </router-link>
            </button>
            <div class="text-center">
                <h1 class="h3 mb-3 ">登入</h1>
                <div class="input-group mb-2">
                    <span class="input-group-text" id="basic-addon1">帳號</span>
                    <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Email address"
                    aria-label="Email"
                    required
                    v-model="user.username"
                    />
                </div>
                <div class="input-group mb-2">
                    <span class="input-group-text" id="basic-addon1">密碼</span>
                    <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    required
                    v-model="user.password"
                    />
                </div>
            </div>
            <div class="text-end mt-4">
                <button  class="login-btn" type="submit">
                    <span class="h5 mb-3">登入</span>
                </button>
            </div>
        </div>
    </form>
 </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        isLoading: false
      }
    }
  },
  methods: {
    logIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token}; exprice=${new Date(expired)}`
            this.$router.push('/dashboard/ProductManage')
          }
        })
    }
  }
}
</script>
<style>
.login{
    height: calc(100vh);
    background: url(@/assets/LoginBg.png)no-repeat center / cover;
}
.warp{
    background: #ffdfdf;
    border-radius: 10px;
    padding: 3rem;
}
.home-link{
  text-decoration: none;
  color: black;
}
.login-btn{
    padding: 10px;
    background: #ffdfdf;
    border: none;
}
.login-btn:hover{
    box-shadow: 0 5px #d47c7c !important;
}
</style>
