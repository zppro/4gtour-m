(function(){
  "use strict";

  function parseQueryString() {
    var ret = {};
    var queryString = decodeURI(decodeURI(window.location.search));
    if (queryString.indexOf("?") != -1) {
      queryString = queryString.substr(1);
    }
    var parms = queryString.split('&');

    for(var i = 0; i < parms.length; i ++) {
      var arr = parms[i].split('=');
      ret[arr[0]] = arr[1];
    }
    return ret;
  }

  window.proxy= {
    auto_login_retry_count: 0,
    auto_login_retry_max: 2,
    member: {},
    order_info: {},
    $init: function() {
      var ret = parseQueryString();
      this.proxy_url = ret.url;
    },
    $isLogin: function(){
      return !!this.member.member_id
    },
    $needLogin: function() {
      return !this.$isLogin() && this.auto_login_retry_count < this.auto_login_retry_max;
    },
    $exec: function(method,params) {
      if(!this.proxy_url){
        return;
      }
      if (!this.proxyHost) {
        this.proxyHost = document.createElement('iframe');
        this.proxyHost.id = 'proxy_frame';
        this.proxyHost.name = 'proxy_frame';
        this.proxyHost.style.display = 'none';
        document.body.appendChild(this.proxyHost);
      }
      var arr = [];
      if(params){
        for (var key in params) {
          arr.push(key + '=' + params[key]);
        }
      }
      var url = encodeURI(encodeURI(this.proxy_url + '?method=' + method + '&' + arr.join('&') + '&ts=' + (new Date().getTime())));
      this.proxyHost.src = url;
    },
    autoLogin: function(params){
      if(params.member_id){
        //alert(JSON.stringify(params));
        this.member.member_id = params.member_id;
        this.member.member_name = params.member_name;
        this.order_info.link_man = params.order_link_man;
        this.order_info.link_phone = params.order_link_phone;
      }
      this.auto_login_retry_count++;
    },
    setMember: function(params){
      // alert(JSON.stringify(params));
      this.member = params;//保证设置了用户 params {member_id: member_name:}
    },
    setToken: function (params) {
      this.token = params.token;
    }
  };
  window.proxy.$init();
  // window.proxy.$exec('remote-proxy');
}())
