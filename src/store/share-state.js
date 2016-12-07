import { DATA_REFRESH_TEXT, DATA_FETCH_TEXT, DATA_APPEND_TEXT, DATA_SAVE_TEXT } from './loading-texts'
export default {
  env: window.env, // 串联env.js
  loading: false,
  loadingTimeout: 10, // 秒
  routerTransiting: false,
  routerTransitValue: 0,
  routerTransitHeight: 1,
  dataFetchingSize: 9,
  dataFetchingSizeSmall: 3,
  infiniteScrollDistance: 10,
  dataRefreshText: DATA_REFRESH_TEXT,
  dataFetchText: DATA_FETCH_TEXT,
  dataAppendText: DATA_APPEND_TEXT,
  dataSaveText: DATA_SAVE_TEXT,
  leftPopupVisible: false,
  submitingForm: false,
  defaultMemberHeadPortrait: 'http://img2.okertrip.com/user-temp-headpic.png?imageView2/1/w/70/h/70',
  defaultTAHeadPortrait: 'http://img2.okertrip.com/user-temp-headpic.png',
  authMemberByTokenPromise: Promise.resolve(false),
  d: {} // 字典容器
}
