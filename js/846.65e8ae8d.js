"use strict";(self["webpackChunkwork"]=self["webpackChunkwork"]||[]).push([[846],{5946:function(t,i){i.Z={inject:["emitter"],methods:{getCarts(){this.isLoading=!0;const t="https://vue3-course-api.hexschool.io/api/zyt-api/cart";this.$http.get(t).then((t=>{t.data.success&&(this.isLoading=!1,this.cartLength=t.data.data.carts.length,this.emitter.emit("push-CartNotice",{data:this.cartLength}))}))}}}},3881:function(t,i){i.Z={methods:{getFavorite(){if(localStorage.getItem("favoriteItem")){const t=localStorage.getItem("favoriteItem");this.idList=JSON.parse(t),this.favoriteLength=this.idList.length}else this.idList=[],this.favoriteLength=0;this.emitter.emit("push-FavNotice",{data:this.favoriteLength})}}}},6846:function(t,i,e){e.r(i),e.d(i,{default:function(){return j}});e(7658);var s=e(3396),a=e(9242),o=e(7139);const r={key:0,class:"text-center my-5 py-5"},c=(0,s._)("h2",{class:"noFavoriteList-title"},"尚未收藏任何產品喔!",-1),d={key:1,class:"mt-5"},n={class:"row"},l={class:"card mt-1 mb-2 mx-auto"},h=["onClick"],u={class:"overflow-hidden text-light position-relative border-bottom card-pic"},g={class:"position-absolute bg-secondary px-2 bottom-0 end-0 rounded m-1"},p={class:"card-text"},v=["src","alt"],m={class:"card-body text-dark"},f={class:"row overflow-hidden"},w={class:"card-title col-10 overflow-hidden"},L={class:"mw-25 text-end col-2 add-favorite"},y=["onClick"],b={key:0,class:"bi bi-heart text-danger"},k={key:1,class:"bi bi-heart-fill text-danger"},_={class:"card-text card-price"},x={key:0,class:"text-decoration-line-through fs-6"},C={class:"fs-5"},D={class:"card-footer"},I=["onClick"],$={key:0,class:"spinner-border text-light spinner-border-sm",role:"status"},F=(0,s._)("span",{class:"visually-hidden"},"Loading...",-1),z=[F],N={key:1,class:"bi bi-cart-plus"};function P(t,i,e,F,P,S){const Z=(0,s.up)("Loading");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(Z,{active:P.isLoading},null,8,["active"]),0===P.favoriteList.length?((0,s.wg)(),(0,s.iD)("section",r,[c,(0,s._)("button",{type:"button",class:"btn button-light-color mt-2",onClick:i[0]||(i[0]=(0,a.iM)((i=>t.$router.push("/products")),["prevent"]))},"來去逛逛 ")])):((0,s.wg)(),(0,s.iD)("section",d,[(0,s._)("div",n,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(P.favoriteList,(i=>((0,s.wg)(),(0,s.iD)("div",{class:"col-sm-12 col-md-6 col-lg-4",key:i.id},[(0,s._)("div",l,[(0,s._)("a",{href:"#",onClick:(0,a.iM)((t=>S.getProduct(i.id)),["prevent"])},[(0,s._)("div",u,[(0,s._)("div",g,[(0,s._)("p",p,(0,o.zw)(i.category),1)]),(0,s._)("img",{src:i.imageUrl,alt:i.title,class:"card-img-top d-block align-middle w-100 w-auto mx-auto"},null,8,v)]),(0,s._)("div",m,[(0,s._)("div",null,[(0,s._)("h3",f,[(0,s._)("div",w,(0,o.zw)(i.title),1),(0,s._)("div",L,[(0,s._)("a",{href:"#",onClick:(0,a.iM)((t=>S.removeFavorite(i)),["stop","prevent"])},[t.idList.every((t=>i.id!==t))?((0,s.wg)(),(0,s.iD)("i",b)):((0,s.wg)(),(0,s.iD)("i",k)),(0,s.Uk)((0,o.zw)(null))],8,y)])])]),(0,s._)("p",_,[i.origin_price!==i.price?((0,s.wg)(),(0,s.iD)("span",x," NT$"+(0,o.zw)(t.$filters.currency(i.origin_price)),1)):(0,s.kq)("",!0),(0,s._)("span",C," NT$"+(0,o.zw)(t.$filters.currency(i.price)),1)])])],8,h),(0,s._)("div",D,[(0,s._)("button",{type:"button",class:"btn button-light-color w-100",onClick:(0,a.iM)((t=>S.addCart(i.id)),["prevent"])},[this.status.loadingItem===i.id?((0,s.wg)(),(0,s.iD)("div",$,z)):((0,s.wg)(),(0,s.iD)("i",N)),(0,s.Uk)("加入購物車 ")],8,I)])])])))),128))])]))],64)}var S=e(5946),Z=e(3881),M={inject:["emitter"],mixins:[S.Z,Z.Z],data(){return{favoriteList:[],status:{loadingItem:""},isLoading:!1}},methods:{getFavoriteProducts(){this.isLoading=!0;const t="https://vue3-course-api.hexschool.io/api/zyt-api/products/all";this.$http.get(t).then((t=>{if(t.data.success){this.isLoading=!1;const i=t.data.products,e=[];this.favoriteList=[],i.forEach((t=>{e.push(t.category),this.idList.some((i=>t.id===i))&&this.favoriteList.push(t)}))}}))},addCart(t){this.status.loadingItem=t;const i={product_id:t,qty:1},e="https://vue3-course-api.hexschool.io/api/zyt-api/cart";this.$http.post(e,{data:i}).then((t=>{this.status.loadingItem="",this.getCarts(),this.emitter.emit("push-message",{style:"success",title:"已加入購物車"})}))},removeFavorite(t){this.idList.indexOf(t.id),this.idList.splice(this.idList.indexOf(t.id),1),localStorage.setItem("favoriteItem",JSON.stringify(this.idList)),this.getFavoriteProducts(),this.emitter.emit("push-message",{style:"danger",title:"已取消收藏"})},getProduct(t){this.$router.push(`/products/${t}`)}},created(){this.getFavoriteProducts(),this.getFavorite()}},O=e(89);const U=(0,O.Z)(M,[["render",P]]);var j=U}}]);
//# sourceMappingURL=846.65e8ae8d.js.map