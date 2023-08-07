import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/Front/ProductsView.vue')
      },
      {
        path: 'products/:productId',
        name: 'productDetail',
        component: () => import('../views/Front/ProductDetailView.vue')
      },
      {
        path: 'userCart',
        component: () => import('../views/Front/UserCartView.vue')
      },
      {
        path: 'userCheckinfo',
        component: () => import('../views/Front/UserCheckinfoView.vue')
      },
      {
        path: 'userCheckout/:orderId',
        component: () => import('../views/Front/UserCheckoutView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashBoardView.vue'),
    children: [
      {
        path: 'ProductManage',
        name: 'ProductManage',
        component: () => import('../views/Admin/ProductManage.vue')
      },
      {
        path: 'OrderManage',
        name: 'OrderManage',
        component: () => import('../views/Admin/OrderManage.vue')
      },
      {
        path: 'CouponManage',
        name: 'CouponManage',
        component: () => import('../views/Admin/CouponManage.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
