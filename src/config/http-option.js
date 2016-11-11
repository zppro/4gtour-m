import store from '../store'
// 'http://192.168.101.3:3002/me-services' 'http://192.168.255.104:3002/me-services'
export const root = process.env.NODE_ENV === 'development' ? 'http://sh.okertrip.com/me-services' : 'http://sh.okertrip.com/me-services'
// Vue.http.options.emulateJSON = true
export const credentials = true
export const interceptor = (request, next) => {
  // if (request.url.toLowerCase().match(/^http/i)) {
  //   // 临时的其他域
  //   next()
  //   return
  // }
  let ts = Math.round(new Date().getTime() / 1000)
  request.headers.set('X-Custom-TS', '' + ts)

  // Header
  let oHeader = {alg: 'HS256', typ: 'JWT'}
  // Payload
  let oPayload = {}
  let salt = 'carrycheng:' + ts
  oPayload.member = store.state.member.self
  let sHeader = JSON.stringify(oHeader)
  let sPayload = JSON.stringify(oPayload)
  let sJWT = window.KJUR.jws.JWS.sign('HS256', sHeader, sPayload, salt)
  console.log(JSON.stringify(oPayload))
  request.headers.set('Authorization', 'Bearer ' + sJWT) // 'Bearer or Basic: '
  next()
}
