/**
 * @module placeholder
 * 
 * @name placeholder兼容IE
 * @author hi:lovexctk <zhangwei11@baidu.com>
 * @version 2014-6-6
 */



;(function (factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.fn.placeHolder = function () {
        var isSupport = 'placeholder' in document.createElement('input');
        var $elBox = $(this);
        var $els = $elBox.find("textarea, input");
            
        if (!isSupport) {
            $.each($els, function (i, v) {
                if ($(v).val() == '') {
                    $(v).addClass("placeholder").val($(v).attr("placeholder"));
                }
                $(v).focus(function () {
                    if ($(v).val() == $(v).attr("placeholder")) {
                        $(v).val('').removeClass("placeholder");
                    }
                });
                $(v).blur(function () {
                    if ($(v).val() == $(v).attr("placeholder") || $(v).val() == '') {
                        $(v).val($(v).attr("placeholder")).addClass("placeholder");
                    }
                });
            });
        }
    };
}));