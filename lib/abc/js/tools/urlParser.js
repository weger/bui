/**
 * @module urlParser
 * 
 * @name 获取当前url,将参数串转化成JSON类型
 * @author HI:lovexctk  <zhangwei11@baidu.com>
 * @version 2013-2-27
 */



define(function() {
    
    var parseURL = function (url){
        var urlStr = url || window.location.href.match(/(\?[^\?]*)$/)?window.location.href.match(/(\?[^\?]*)$/)[1]:"";
            param = {};
        
        if(urlStr){
            var urlArr = urlStr.split("?")[1].split(/&|#/);
            
            for (var i = urlArr.length - 1; i >= 0; i--){
                var tempArr = urlArr[i].split("=");
                param[tempArr[0]] = tempArr[1];
            }
        }
        return param;
    };
    
    return parseURL();
});