import HomeNav from '../views/partials/HomeNav'
import Home from '../views/Home'
import LeftPopup from '../views/partials/LeftPopup'
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
    path: '/',
    components: {
      head: HomeNav,
      body: Home,
      leftPopup: LeftPopup
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
    path: '/details/:id',
    components: {
      head: DetailsNav,
      body: Details
    },
    children: [
      {
        path: 'info',
        components: {
          info: DetailsInfo
        }
      },
      {
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
