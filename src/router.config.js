import HomeNav from './views/partials/HomeNav'
import Home from './views/Home'
import DetailsNav from './views/partials/ProductDetailsNav'
import Details from './views/ProductDetails'
import DetailsInfo from './views/ProductDetailsInfo'
import DetailsIntro from './views/ProductDetailsIntro'
import Nav from './views/partials/Nav'
import TicketSelect from './views/TicketSelect'
export default [
  // {
  //   path: '*', component: App
  // },
  {
    path: '/',
    components: {
      head: HomeNav,
      body: Home
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
    path: '/ticket-select/:id',
    components: {
      head: Nav,
      body: TicketSelect
    }
  }
]
