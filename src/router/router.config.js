import HomeNav from '../views/partials/HomeNav'
import Home from '../views/Home'
import Login from '../views/Login'
import DetailsNav from '../views/partials/ProductDetailsNav'
import Details from '../views/ProductDetails'
import DetailsInfo from '../views/ProductDetailsInfo'
import DetailsIntro from '../views/ProductDetailsIntro'
import Nav from '../views/partials/Nav'
import MyOrders from '../views/MyOrders'
import TicketSelect from '../views/TicketSelect'
import OrderConfirm from '../views/OrderConfirm'

export default [
  // {
  //   path: '*', component: App
  // },
  {
    name: '首页',
    path: '/',
    components: {
      head: HomeNav,
      body: Home
    }
  },
  {
    name: '登录',
    path: '/login',
    components: {
      head: Nav,
      body: Login
    }
  },
  {
    name: '景点详情',
    path: '/details/:id',
    components: {
      head: DetailsNav,
      body: Details
    },
    children: [
      {
        name: '景点信息',
        path: 'info',
        components: {
          info: DetailsInfo
        }
      },
      {
        name: '景点介绍',
        path: 'intro',
        components: {
          intro: DetailsIntro
        }
      }
    ]
  },
  {
    name: '挑选门票',
    path: '/ticket-select/:id',
    components: {
      head: Nav,
      body: TicketSelect
    }
  },
  {
    name: '填写订单',
    path: '/order-confirm/:id,:quantity',
    components: {
      head: Nav,
      body: OrderConfirm
    }
  },
  {
    name: '我的订单',
    meta: { auth: true },
    path: '/my-orders',
    components: {
      head: Nav,
      body: MyOrders
    }
  }
]
