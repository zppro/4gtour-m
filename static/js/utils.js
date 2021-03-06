(function(doc, win){
  "use strict";

  function isPhone(aPhone) {
    var bValidate = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone);
    if (bValidate) {
      return true;
    }
    else
      return false;
  }
  function isIDNo(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;

    //if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
    if(!code || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(code)){
      tip = "身份证号格式错误";
      pass = false;
    }

    else if(!city[code.substr(0,2)]){
      tip = "地址编码错误";
      pass = false;
    }
    else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17].toUpperCase()) {
          tip = "校验位错误";
          pass = false;
        }
      }
      else {
        pass = false;
      }
    }
    return pass;
  }

  function loadScript(path){
    window.document.write('<script type="text/javascript" src="' + path + '"></script>');
  }

  function rem2px (rem) {
    var width = window.$('html').width();
    var px1;
    if(width > 640 ){
      px1 = 40;
    } else if (width> 568 && width <= 640) {
      px1 = 35;
    } else if (width> 480 && width <= 568) {
      px1 = 30;
    } else if (width> 427 && width <= 480) {
      px1 = 26.75;
    } else if (width> 400 && width <= 427) {
      px1 = 25;
    } else {
      px1 = 20;
    }
    return (px1 * rem).toFixed(0);
  }

  function px2rem (px) {
    px = parseFloat(px);
    var width = window.$('html').width();
    var px1;
    if(width > 640 ){
      px1 = 40;
    } else if (width> 568 && width <= 640) {
      px1 = 35;
    } else if (width> 480 && width <= 568) {
      px1 = 30;
    } else if (width> 427 && width <= 480) {
      px1 = 26.75;
    } else if (width> 400 && width <= 427) {
      px1 = 25;
    } else {
      px1 = 20;
    }
    return (px / px1).toFixed(4);
  }

  function qiniuImageView (img, w, h, mode) {
    return img + '?imageView2/' + (mode || 1) + '/w/' + w + '/h/' + h
  }

  String.prototype.Trim = function()
  {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  }
  String.prototype.LTrim = function()
  {
    return this.replace(/(^\s*)/g, "");
  }
  String.prototype.RTrim = function()
  {
    return this.replace(/(\s*$)/g, "");
  }

  window.utils = {
    isPhone:isPhone,
    isIDNo:isIDNo,
    loadScript: loadScript,
    rem2px: rem2px,
    px2rem: px2rem,
    qiniuImageView: qiniuImageView
  };
}())
