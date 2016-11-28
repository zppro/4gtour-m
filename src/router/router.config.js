import filters from '../config/vue-filter-option'
import HomeNav from '../views/partials/HomeNav'
import Home from '../views/Home'
import Login from '../views/Login'
import DetailsNav from '../views/partials/ProductDetailsNav'
import Details from '../views/ProductDetails'
import DetailsInfo from '../views/ProductDetailsInfo'
import DetailsIntro from '../views/ProductDetailsIntro'
import Nav from '../views/partials/Nav'
import MyOrdersNav from '../views/partials/MyOrdersNav'
import MyOrders from '../views/MyOrders'
import OrderDetailsNav from '../views/partials/OrderDetailsNav'
import OrderDetails from '../views/OrderDetails'
import TicketSelect from '../views/TicketSelect'
import OrderConfirm from '../views/OrderConfirm'
import WeixinAuthNav from '../views/partials/WeixinAuthNav'
import WeixinAuth from '../views/WeixinAuth'
import ExperienceNav from '../views/partials/ExperienceNav'
import ExperienceFollowedList from '../views/ExperienceFollowedList'
import ExperienceHotList from '../views/ExperienceHotList'
import ExperienceMineList from '../views/ExperienceMineList'
import ExperienceDetailsNav from '../views/partials/ExperienceDetailsNav'
import ExperienceDetails from '../views/ExperienceDetails'
import ExperienceDetailsFeeling from '../views/ExperienceDetailsFeeling'
import ExperienceDetailsRoute from '../views/ExperienceDetailsRoute'
import ExperienceDetailsFeelingAddNav from '../views/partials/ExperienceDetailsFeelingAddNav.vue'
import ExperienceDetailsFeelingAdd from '../views/ExperienceDetailsFeelingAdd.vue'

function attachFilters (component, filterOption) {
  component.filters = component.filters || {}
  Object.assign(component.filters, filters)
  return component
}

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
    name: '微信认证',
    path: '/weixin-auth',
    components: {
      head: WeixinAuthNav,
      body: WeixinAuth
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
    path: '/order/:id,:quantity',
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
      head: MyOrdersNav,
      body: attachFilters(MyOrders, filters)
    }
  },
  {
    name: '订单详情',
    meta: { auth: true },
    path: '/order-details/:id',
    components: {
      head: OrderDetailsNav,
      body: attachFilters(OrderDetails, filters)
    }
  },
  {
    name: '关注见闻',
    path: '/experience/follow',
    components: {
      head: ExperienceNav,
      body: ExperienceFollowedList
    }
  },
  {
    name: '热门见闻',
    path: '/experience/hot',
    components: {
      head: ExperienceNav,
      body: ExperienceHotList
    }
  },
  {
    name: '我的见闻',
    meta: { auth: true },
    path: '/experience/mine',
    components: {
      head: ExperienceNav,
      body: ExperienceMineList
    }
  },
  {
    name: '见闻详情',
    path: '/experience-details/:id',
    components: {
      head: ExperienceDetailsNav,
      body: ExperienceDetails
    },
    children: [
      {
        name: '见闻-感受',
        path: 'feeling',
        components: {
          feeling: ExperienceDetailsFeeling
        }
      },
      {
        name: '见闻-路线',
        path: 'route',
        components: {
          route: ExperienceDetailsRoute
        }
      }
    ]
  },
  {
    name: '新增',
    meta: { auth: true },
    path: '/experience-add/feeling',
    components: {
      head: ExperienceDetailsFeelingAddNav,
      body: ExperienceDetailsFeelingAdd
    }
  },
  {
    name: '转发',
    meta: { auth: true },
    path: '/experience-retweet/:id',
    components: {
      head: ExperienceDetailsFeelingAddNav,
      body: ExperienceDetailsFeelingAdd
    }
  }
]
