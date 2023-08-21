"use strict";(self["webpackChunkwork"]=self["webpackChunkwork"]||[]).push([[744],{6744:function(e,t,o){o.r(t),o.d(t,{default:function(){return O}});var s=o(3396),n=o(7139);const a={class:"text-end mt-4"},l={class:"table mt-4"},i=(0,s._)("thead",null,[(0,s._)("tr",null,[(0,s._)("th",null,"名稱"),(0,s._)("th",null,"折扣百分比"),(0,s._)("th",null,"到期日"),(0,s._)("th",null,"是否啟用"),(0,s._)("th",null,"編輯")])],-1),d={key:0,class:"text-success"},u={key:1,class:"text-muted"},p={class:"btn-group"},c=["onClick"],r=["onClick"];function h(e,t,o,h,m,_){const b=(0,s.up)("Loading"),C=(0,s.up)("CouponModal"),g=(0,s.up)("CheckModal");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",null,[(0,s.Wm)(b,{active:m.isLoading},null,8,["active"]),(0,s._)("div",a,[(0,s._)("button",{class:"btn btn-primary",onClick:t[0]||(t[0]=e=>_.openModal(!0))}," 建立新的優惠券 ")]),(0,s._)("table",l,[i,(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(m.coupons,((t,o)=>((0,s.wg)(),(0,s.iD)("tr",{key:o},[(0,s._)("td",null,(0,n.zw)(t.title),1),(0,s._)("td",null,(0,n.zw)(t.percent)+"%",1),(0,s._)("td",null,(0,n.zw)(e.$filters.date(t.due_date)),1),(0,s._)("td",null,[1===t.is_enabled?((0,s.wg)(),(0,s.iD)("span",d,"啟用")):((0,s.wg)(),(0,s.iD)("span",u,"未起用"))]),(0,s._)("td",null,[(0,s._)("div",p,[(0,s._)("button",{class:"btn btn-outline-primary btn-sm",onClick:e=>_.openModal(!1,t)},"編輯",8,c),(0,s._)("button",{class:"btn btn-outline-danger btn-sm",onClick:e=>_.openCheckModal(t)},"刪除",8,r)])])])))),128))])])]),(0,s.Wm)(C,{ref:"couponModal",coupon:m.tempCoupon,onUpdateCoupon:_.updataCoupon},null,8,["coupon","onUpdateCoupon"]),(0,s.Wm)(g,{ref:"checkModal",dataStatus:m.tempCoupon,onDeleteConfirmed:_.deleteCoupon},null,8,["dataStatus","onDeleteConfirmed"])],64)}var m=o(9242);const _={class:"modal fade",id:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},b={class:"modal-dialog modal-xl",role:"document"},C={class:"modal-content border-0"},g=(0,s._)("div",{class:"modal-header bg-dark text-white"},[(0,s._)("h5",{class:"modal-title",id:"exampleModalLabel"},[(0,s._)("span",null,"新增優惠券")]),(0,s._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),f={class:"modal-body"},y={class:"mb-3"},v=(0,s._)("label",{for:"title"},"標題",-1),w={class:"mb-3"},k=(0,s._)("label",{for:"coupon_code"},"優惠碼",-1),M={class:"mb-3"},x=(0,s._)("label",{for:"due_date"},"到期日",-1),$={class:"mb-3"},D=(0,s._)("label",{for:"price"},"折扣百分比",-1),L={class:"mb-3"},z={class:"form-check"},U=(0,s._)("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),V={class:"modal-footer"},N=(0,s._)("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"取消",-1);function S(e,t,o,n,a,l){return(0,s.wg)(),(0,s.iD)("div",_,[(0,s._)("div",b,[(0,s._)("div",C,[g,(0,s._)("div",f,[(0,s._)("div",y,[v,(0,s.wy)((0,s._)("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[0]||(t[0]=e=>a.tempCoupon.title=e),placeholder:"請輸入標題"},null,512),[[m.nr,a.tempCoupon.title]])]),(0,s._)("div",w,[k,(0,s.wy)((0,s._)("input",{type:"text",class:"form-control",id:"coupon_code","onUpdate:modelValue":t[1]||(t[1]=e=>a.tempCoupon.code=e),placeholder:"請輸入優惠碼"},null,512),[[m.nr,a.tempCoupon.code]])]),(0,s._)("div",M,[x,(0,s.wy)((0,s._)("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":t[2]||(t[2]=e=>a.due_date=e)},null,512),[[m.nr,a.due_date]])]),(0,s._)("div",$,[D,(0,s.wy)((0,s._)("input",{type:"number",class:"form-control",id:"price","onUpdate:modelValue":t[3]||(t[3]=e=>a.tempCoupon.percent=e),placeholder:"請輸入折扣百分比"},null,512),[[m.nr,a.tempCoupon.percent,void 0,{number:!0}]])]),(0,s._)("div",L,[(0,s._)("div",z,[(0,s.wy)((0,s._)("input",{class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,id:"is_enabled","onUpdate:modelValue":t[4]||(t[4]=e=>a.tempCoupon.is_enabled=e)},null,512),[[m.e8,a.tempCoupon.is_enabled]]),U])])]),(0,s._)("div",V,[N,(0,s._)("button",{type:"button",class:"btn btn-primary",onClick:t[5]||(t[5]=t=>e.$emit("update-coupon",a.tempCoupon))},"確認 ")])])])],512)}var Z=o(1339),j={mixins:[Z.Z],props:{coupon:{}},emits:["update-coupon"],watch:{coupon(){this.tempCoupon=this.coupon;const e=new Date(1e3*this.tempCoupon.due_date).toISOString().split("T");[this.due_date]=e},due_date(){this.tempCoupon.due_date=Math.floor(new Date(this.due_date)/1e3)}},data(){return{tempCoupon:{},due_date:""}}},W=o(89);const H=(0,W.Z)(j,[["render",S]]);var T=H,Y=o(2809),I={components:{CouponModal:T,CheckModal:Y.Z},inject:["emitter"],data(){return{coupons:{},tempCoupon:{title:"",is_enabled:0,percent:100,code:""},isNew:!1,isLoading:!1}},methods:{getCoupons(){this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/api/zyt-api/admin/coupons";this.$http.get(e).then((e=>{this.isLoading=!1,this.coupons=e.data.coupons}))},updataCoupon(e){if(this.isNew){const t="https://vue3-course-api.hexschool.io/api/zyt-api/admin/coupon";this.$http.post(t,{data:e}).then((e=>{this.$refs.couponModal.hideModal(),e.data.success?(this.getCoupons(),this.emitter.emit("push-message",{style:"success",title:"新增成功"})):this.emitter.emit("push-message",{style:"danger",title:"新增失敗",content:e.data.message.join("、")})}))}else{const t=`https://vue3-course-api.hexschool.io/api/zyt-api/admin/coupon/${this.tempCoupon.id}`;this.$http.put(t,{data:e}).then((e=>{this.$refs.couponModal.hideModal(),e.data.success?(this.getCoupons(),this.emitter.emit("push-message",{style:"success",title:"編輯成功"})):this.emitter.emit("push-message",{style:"danger",title:"編輯失敗",content:e.data.message.join("、")})}))}},deleteCoupon(e){this.isLoading=!0;const t=`https://vue3-course-api.hexschool.io/api/zyt-api/admin/coupon/${e.id}`;this.$http.delete(t).then((e=>{this.isLoading=!1,this.$refs.checkModal.hideModal(),this.getCoupons(),console.log(e),this.emitter.emit("push-message",{style:"success",title:"刪除完成"})}))},openModal(e,t){this.isNew=e,this.isNew?this.tempCoupon={due_date:(new Date).getTime()/1e3}:this.tempCoupon={...t},this.$refs.couponModal.showModal()},openCheckModal(e){this.tempCoupon={...e},this.$refs.checkModal.showModal()}},created(){this.getCoupons()}};const K=(0,W.Z)(I,[["render",h]]);var O=K}}]);
//# sourceMappingURL=744.6cbbe6ae.js.map