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
    token: 'none',
    $init: function() {
      var ret = parseQueryString();
      this.proxy_url = ret.url;
      alert(this.proxy_url);

    },
    $exec: function(method,params) {
      alert('$exec');
      if (!this.proxyHost) {
        this.proxyHost = document.createElement('iframe');
        this.proxyHost.name = 'proxy_frame';
        this.proxyHost.style.display = 'none';
      }
      var arr = [];
      if(params){
        for (var key in params) {
          arr.push(key + '=' + escape(params[key]));
        }
      }
      var url = this.proxy_url + '?method=' + method + '&' + arr.join('&') + '&ts=' + (new Date().getTime());
      alert(url);
      alert(this.proxyHost);
      this.proxyHost.src = this.proxy_url + '?method=' + method + '&' + arr.join('&') + '&ts=' + (new Date().getTime());
    },
    setToken: function (params) {
      this.token = params;
    }
  };
  window.proxy.$init();

}())
