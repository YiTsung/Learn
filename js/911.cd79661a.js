"use strict";(self["webpackChunkwork"]=self["webpackChunkwork"]||[]).push([[911],{911:function(s,e,t){t.r(e),t.d(e,{default:function(){return k}});var a=t(3396),n=t(9242);const r={class:"login w-100 row align-items-center m-0"},o={class:"warp col-md-6"},i={type:"button",class:"login-btn"},u=(0,a._)("span",{class:"h5 mb-3"},"回首頁",-1),l={class:"text-center"},c=(0,a._)("h1",{class:"h3 mb-3"},"登入",-1),d={class:"input-group mb-2"},p=(0,a._)("span",{class:"input-group-text",id:"basic-addon1"},"帳號",-1),m={class:"input-group mb-2"},h=(0,a._)("span",{class:"input-group-text",id:"basic-addon1"},"密碼",-1),w=(0,a._)("div",{class:"text-end mt-4"},[(0,a._)("button",{class:"login-btn",type:"submit"},[(0,a._)("span",{class:"h5 mb-3"},"登入")])],-1);function b(s,e,t,b,g,_){const f=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",r,[(0,a._)("form",{class:"row justify-content-center",onSubmit:e[2]||(e[2]=(0,n.iM)(((...s)=>_.logIn&&_.logIn(...s)),["prevent"]))},[(0,a._)("div",o,[(0,a._)("button",i,[(0,a.Wm)(f,{class:"home-link","aria-current":"page",to:"/"},{default:(0,a.w5)((()=>[u])),_:1})]),(0,a._)("div",l,[c,(0,a._)("div",d,[p,(0,a.wy)((0,a._)("input",{type:"email",id:"inputEmail",class:"form-control",placeholder:"Email address","aria-label":"Email",required:"","onUpdate:modelValue":e[0]||(e[0]=s=>g.user.username=s)},null,512),[[n.nr,g.user.username]])]),(0,a._)("div",m,[h,(0,a.wy)((0,a._)("input",{type:"password",id:"inputPassword",class:"form-control",placeholder:"Password","aria-label":"Password",required:"","onUpdate:modelValue":e[1]||(e[1]=s=>g.user.password=s)},null,512),[[n.nr,g.user.password]])])]),w])],32)])}t(7658);var g={data(){return{user:{username:"",password:"",isLoading:!1}}},methods:{logIn(){const s="https://vue3-course-api.hexschool.io/admin/signin";this.$http.post(s,this.user).then((s=>{if(s.data.success){const{token:e,expired:t}=s.data;document.cookie=`hexToken=${e}; exprice=${new Date(t)}`,this.$router.push("/dashboard/ProductManage")}}))}}},_=t(89);const f=(0,_.Z)(g,[["render",b]]);var k=f}}]);
//# sourceMappingURL=911.cd79661a.js.map