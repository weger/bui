/**
 * @module index
 * 
 * @name 首页
 * @version 1.0.0
 */


require.config({
    baseUrl: './js'
});

require(["./common", "./tools"], function (){
    require(['modules/list'], function(list) {
        // 模块初始化
        list.doInit();
    });
});