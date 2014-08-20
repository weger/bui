/**
 * @module indexList
 *
 * @name 首页 列表1
 * @author HI:lovexctk  <zhangwei11@baidu.com>
 * @version 2014-2-26
 */



define(['urls', 'tpls', 'utils', 'dataLoader', 'jquery.tmpl'], function(_url, _tpl, utils, dataLoader) {

    var tpl = _tpl.slide;
    var dataUrl = _url["list"];
    var $el = $("#indexList");

    return {
        render: function (){
            $el.addClass("ui-loading");

            dataLoader.loadData("indexList",function (result) {
                console.log(result);

                $el.removeClass("ui-loading");
            });

        },
        doInit: function (){
            this.render();
        }
    };
});