/**
 * @module mod-b
 * 
 * @name 首页 列表2
 * @author HI:lovexctk  <zhangwei11@baidu.com>
 * @version 2014-2-26
 */



define(['urls', 'tpls', 'utils', 'dataLoader', 'jquery.tmpl'], function(_url, _tpl, utils, dataLoader) {
    
    var tpl = _tpl.slide;
    var dataUrl = _url["slide"];
    var $el = $("#slide");
    
    return {
        render: function (){
            $el.addClass("loading");

            dataLoader.loadData("slide",function (result) {
                console.log(result);
            })
            
        },
        doInit: function (){
            alert(1);
            this.render();
        }
    };
});