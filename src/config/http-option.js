import store from '../store'
// 'http://192.168.101.7:3002/me-services' 'http://192.168.255.116:3002/me-services'
export const root = process.env.NODE_ENV === 'development' ? 'http://192.168.255.107:3002/me-services' : 'http://sh.okertrip.com/me-services'
// Vue.http.options.emulateJSON = true
export const credentials = true
export const auth = (request, next) => {
  // console.log('auth request.headers')
  // console.log(request.headers)
  let ts = Math.round(new Date().getTime() / 1000)
  request.headers.set('X-Custom-TS', '' + ts)
  let oHeader = {alg: 'HS256', typ: 'JWT'}
  let oPayload = {}
  let salt = 'carrycheng:' + ts
  oPayload.member = store.state.member.self
  let sHeader = JSON.stringify(oHeader)
  let sPayload = JSON.stringify(oPayload)
  let sJWT = window.KJUR.jws.JWS.sign('HS256', sHeader, sPayload, salt)
  // console.log(JSON.stringify(oPayload))
  request.headers.set('Authorization', 'Bearer ' + sJWT) // 'Bearer or Basic: '
  next()
}
export const before = (request, next) => {
  request.timeout && (request.timeoutId = setTimeout(() => {
    store.dispatch('toastInfo', '您的网络似乎不太给力')
    store.state.loading && store.dispatch('finishLoading')
  }, request.timeout))
}

export const loadingIndicator = (request, next) => {
  const loadingText = request.headers.get('loadingText')
  if (loadingText) {
    request.headers.delete('loadingText')
  }
  loadingText && store.dispatch('startLoading', loadingText)
  next((response) => {
    clearTimeout(request.timeoutId)
    loadingText && store.state.loading && store.dispatch('finishLoading')
  })
}

export const errorCallback = (response) => {
  console.log(response)
}
