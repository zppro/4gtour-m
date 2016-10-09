import App from './Home'
import Nav from './views/partials/Nav'

export default [
  // {
  //   path: '*', component: App
  // },
  {
    path: '/',
    components: {
      home: App,
      head: Nav
    }
  }
]
