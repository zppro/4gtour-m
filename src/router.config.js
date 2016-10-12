import App from './App'
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
