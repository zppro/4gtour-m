(function(){
  "use strict";
  var u = window.navigator.userAgent.toLowerCase();
  var host = window.location.host.toLowerCase();
  function isWeixin() {
    if (u.match(/MicroMessenger/i) == 'micromessenger' || host == 'http://weixin.okertrip.com' || host == 'localhost:8080') {
      return true;
    } else {
      return false;
    }
  }
  function isApiCloud() {
    if (u.match(/APICloud/i) == 'apicloud'  || host == 'http://ios-apicloud.okertrip.com'  || host == 'http://android-apicloud.okertrip.com') {
      return true;
    } else {
      return false;
    }
  }

  var browser = {
    versions: function() {
      return {//移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
  window.env = {
    isIOS: browser.versions.ios || browser.versions.iPhone || browser.versions.iPad,
    isAndroid: browser.versions.android,
    isWeixin: isWeixin(),
    isApiCloud: isApiCloud()
  };

  if(window.env.isWeixin){
    window.utils.loadScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
  }

}())
