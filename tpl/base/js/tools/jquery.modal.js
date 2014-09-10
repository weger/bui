/**
 * @fileOverview
 * 弹出层效果
 * @author Hi:lovexctk <zhangwei11@baidu.com>
 * @version 2011-10-19
 */



;(function (factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.fn.modal = function(options) {
        var defaults = {
            "title": '',
            "content": '这里是内容',
            "width": 430,
            "height": 504,
            "type":"",
            "maskClickDestroy": true,
            "afterOpen": function(){
                //console.log("afterOpen");
            },
            "beforeClose": function (){
                //console.log("beforeClose");
            }
        }
        var opts = $.extend({}, defaults,options);

        var $modalWrap = $('<div class="modal"></div>');
        var $closeStr = $('<button type="button" class="close">×</button>');
        var $headStr = $('<div class="modal-header"></div>');
        var $bodyStr = $('<div class="modal-body"></div>');
        var $prompt = $('<div class="modal-prompt"></div>');
        var $successStr = $('<div class="modal-success"><span class="icon"></span><div class="txt"></div></div>');
        var $errorStr = $('<div class="modal-error"><span class="icon"></span><div class="txt"></div></div>');
        var $footStr = $('<div class="modal-footer"><a href="#" class="btn yes-btn">确定</a><a href="#" class="btn no-btn">取消</a></div>');
        var $maskDiv = $('<div id="maskDiv"></div>');
        var $maskIframe = $('<iframe id="maskIframe" frameborder="0" marginheight="0" marginwidth="0"></iframe>');

        // 构建结构
        $modalWrap.append($closeStr);
        if(opts.title){
            $headStr.append('<span class="icon"></span><h3>' + opts.title + '</h3>');
            $modalWrap.append($headStr);
        }
        $("html").css("overflow", "hidden");


        if(opts.type){
            switch(opts.type){
                case "prompt":
                    $prompt.append(opts.content);
                    $bodyStr.append($prompt);

                    $modalWrap.append($bodyStr);
                    $modalWrap.append($footStr);
                    break;
                case "error":
                    $errorStr.find(".txt").append(opts.content);
                    $bodyStr.append($errorStr);
                    $modalWrap.append($bodyStr);
                    break;
                default:
                    $successStr.find(".txt").append(opts.content);
                    $bodyStr.append($successStr);
                    $modalWrap.append($bodyStr);
            }
        }else{
            $bodyStr.append(opts.content);
            $modalWrap.append($bodyStr);
        }


        //fixed for chrome (overflow hidden scroll bug)
        $('html').bind('mousewheel', function(){return false});

        var destroy = function (){
            $modalWrap.remove();
            $maskDiv.remove();
            $maskIframe.remove();
            $("html").css("overflow", "");
            $("html").unbind();
        }

        $closeStr.click(function(){
            if (opts.beforeClose() == false) {
                return false;
            };
            destroy();
        });

        $maskDiv.click(function (){
            if (!opts.maskClickDestroy) return false;
            if (opts.beforeClose() == false) {
                return false;
            }
            destroy();
        });

        var _this = $(this);


        $("body").append($maskDiv);
        if($.browser.msie && $.browser.version < 7){
            $("body").append($maskIframe);
            $maskIframe.css("height",Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight));
            $maskDiv.css("height",Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight));
        }
        $("body").append($modalWrap);


        var marTopH = $modalWrap.height()/2;

        if(opts.height){
            marTopH = opts.height/2;
        }
        if (opts.width != 430){
            $modalWrap.css({
                "width": opts.width,
                "margin-left": -opts.width/2,
                "margin-top": $(document).scrollTop()-marTopH
            }).show();
        } else {
            $modalWrap.css("margin-top", $(document).scrollTop()-$modalWrap.height()/2).show();
        }

        opts.afterOpen();
    }
}));