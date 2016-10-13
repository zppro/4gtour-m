import Nav from './views/partials/Nav'
import Home from './views/Home'
import Details from './views/ProductDetails'

export default [
  // {
  //   path: '*', component: App
  // },
  {
    path: '/',
    components: {
      head: Nav,
      body: Home
    }
  },
  {
    path: '/details/:id',
    components: {
      head: Nav,
      body: Details
    }
  }
]
