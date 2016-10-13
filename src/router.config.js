import HomeNav from './views/partials/HomeNav'
import Home from './views/Home'
import DetailsNav from './views/partials/ProductDetailsNav'
import Details from './views/ProductDetails'
import DetailsItem from './views/ProductDetailsItem'
import DetailsIntro from './views/ProductDetailsIntro'
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
        path: 'item',
        components: {
          item: DetailsItem
        }
      },
      {
        path: 'intro',
        components: {
          intro: DetailsIntro
        }
      }
    ]
  }
]
