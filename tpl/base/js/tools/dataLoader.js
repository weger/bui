/**
 * @module dataLoader
 *
 * @name 数据加载层，为不同模块提供相同数据
 * 追加对csrf 漏洞的修复
 * @author HI:yuebin_felix  <yuebin01@baidu.com>
 * @version 2013-11-21
 */



define(function() {
    var datas = {};
    return {
        loadData: function (key, opts, success, error) {
            if (key instanceof Array && typeof success == "function") {
                var readyCount = 0;
                var totalCount = key.length;
                $.each(key, function (i, _key) {
                    singleLoad(_key, opts[i]);
                    //注册回调
                    datas[_key].dfd.promise().done(function () {
                        if (++readyCount == totalCount) {
                            var resultArray = [];
                            $.each(key, function (i, _key) {
                                resultArray.push(datas[_key].result);
                            });
                            success(resultArray);
                        }
                    });
                    datas[_key].dfd.promise().fail(function () {
                        if (++readyCount == totalCount) {
                            var resultArray = [];
                            $.each(key, function (i, _key) {
                                resultArray.push(datas[_key].result);
                            });
                            error(resultArray);
                        }
                    });
                });
            } else {
                singleLoad(key, opts, success, error);
                //注册回调
                datas[key].dfd.promise().done(function () {
                    if (typeof opts.success == "function") {
                        opts.success(this);
                    } else if (typeof success == "function"){
                        success(this);
                    }
                });
                datas[key].dfd.promise().fail(function () {
                    if (typeof opts.error == "function") {
                        opts.error(this);
                    } else if (typeof error == "function"){
                        error(this);
                    }
                });
            }
            function singleLoad(key, opts, success, error) {
                //删除缓存内容，重新发送请求
                if (opts.overwrite) {
                    delete datas[key];
                    delete opts["overwrite"];
                }
                if (datas[key]) {
                    //ajax返回后才执行手动resolve，否则等等ajax callback触发resolve
                    if (datas[key].flag) {
                        if (datas[key].dfd.state() == "resolved") {
                            datas[key].dfd.resolveWith(datas[key].result);
                        } else {
                            datas[key].dfd.rejectWith(datas[key].result);
                        }
                    }
                } else {
                    datas[key] = {
                        flag: false,
                        dfd: $.Deferred(),
                        result: null
                    };
                    //发送请求
                    var successTmp = opts.success;
                    var errorTmp = opts.error;
                    if(opts.type && opts.type.toLowerCase() == "post"){
                        var cookie = document.cookie;
                        var csrftoken;
                        var flag = false;
                        if (cookie) {
                            var cookies = cookie.split(';');
                            for (var i = 0; i < cookies.length; i++) {
                                cookies[i] = $.trim(cookies[i]);
                                if(cookies[i].indexOf("csrftoken") > -1){
                                    csrftoken = cookies[i];
                                    flag = true;
                                }
                            }
                        }
                        if(flag){
                            opts.headers = {"csrftoken": csrftoken.replace("csrftoken=", "")};
                        }
                    }
                    $.ajax($.extend({}, opts, {
                        success: function (result) {
                            datas[key].flag = true;
                            datas[key].result = result;
                            datas[key].dfd.resolveWith(datas[key].result);
                        },
                        error: function (msg) {
                            datas[key].flag = true;
                            datas[key].result = msg;
                            datas[key].dfd.rejectWith(datas[key].result);
                        }
                    }));
                };
            }

        }
    };
});