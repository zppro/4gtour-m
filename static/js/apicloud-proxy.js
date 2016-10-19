(function(){
  "use strict";

  function parseQueryString() {
    var ret = {};
    var queryString = window.location.search;
    if (queryString.indexOf("?") != -1) {
      queryString = queryString.substr(1);
    }
    var parms = queryString.split('&');

    for(var i = 0; i < parms.length; i ++) {
      var arr = parms[i].split('=');
      ret[arr[0]] = unescape(arr[1]);
    }
    return ret;
  }

  window.proxy= {
    querty: 'none',
    $init: function() {
      var ret = parseQueryString();
      this.proxy_url = ret.url;
    },
    $exec: function(method,params) {
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
          arr.push(key + '=' + escape(params[key]));
        }
      }
      var url = this.proxy_url + '?method=' + method + '&' + arr.join('&') + '&ts=' + (new Date().getTime());
      // alert(url);
      this.proxyHost.src = this.proxy_url + '?method=' + method + '&' + arr.join('&') + '&ts=' + (new Date().getTime());
    },
    setMember: function(params){
      alert(params);
      alert(params.member_id);
      this.member = params;//保证设置了用户 params {member_id: member_name:}
    },
    setToken: function (params) {
      this.token = params.token;
      alert(this.token);
    }
  };
  window.proxy.$init();
  window.proxy.$exec('remote-proxy');
}())
