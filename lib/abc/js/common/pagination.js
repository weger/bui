/**
 * @module pagination
 * 
 * @name 分页模块
 * @author hi:lovexctk <zhangwei11@baidu.com>
 * @version 2013-3-4
 */



define(function() {
    
    return {
        render: function (options, cbfn){
            var $el = $("#pagination");
            var defaults = {
                "pageNo": 1,
                "pageSize": 10
            }
            
            var opts = $.extend({}, defaults, options);
            
            var pageNo = parseInt(opts.pageNo);
            var totalPages = opts.totalPages;
            var str = '';
            var startIndex = 1;
            var params = opts;
            var loopNum = Math.min(pageNo+2,totalPages);
            
            delete params["totalPages"];
            delete params["callback"];
            
            if (totalPages <= 1 && pageNo <= 1) {
                $el.empty();
                return false;
            }
            
            
            // 添加上一页
            if (pageNo != 1){
                params["pageNo"] = pageNo - 1;
                str += '<a href="?';
                str += $.param(params);
                str += '" class="page-prev">&lt;&lt;&nbsp;上一页</a> ';
            }
            
            if (pageNo == 1){
                params["pageNo"] = 1;
                str += '<span>';
                str += pageNo;
                str += '</span> ';
            }
            
            if (pageNo > 1){
                params["pageNo"] = 1;
                str += '<a href="?';
                str += $.param(params);
                str += '">1</a> ';
            }
            
            if (pageNo >= 6){
                str += '<span class="page-dot">...</span> ';
            }
            
            if (totalPages < 6){
                startIndex = 1;
                loopNum = totalPages;
            }
            if(totalPages >= pageNo && pageNo > 4){
                startIndex = pageNo - 3;
            }
            if(pageNo <= 4 && totalPages >6){
                loopNum = 6;
                if (totalPages == 7) {
                    loopNum = 7;
                }
            }
            
            for (; startIndex <= loopNum; startIndex++) {
                
                if(startIndex == 1){
                    continue;
                }
                if(startIndex == pageNo ){
                    str += '<span>'
                    str += startIndex;
                    str += '</span> ';
                } else {
                    params["pageNo"] = startIndex;
                    str += '<a href="?';
                    str += $.param(params);
                    str += '">';
                    str += startIndex;
                    str += '</a> ';
                }
            }
            
            // 添加...
            if (loopNum < totalPages){
                if(totalPages - pageNo > 3){
                    str += '<span class="page-dot">...</span> ';
                }
                params["pageNo"] = totalPages;
                str += '<a href="?';
                str += $.param(params);
                str += '">';
                str += totalPages;
                str += '</a> ';
            }
            
            // 添加下一页
            if (totalPages !=0 && pageNo < totalPages){
                params["pageNo"] = pageNo + 1;
                str += '<a href="?';
                str += $.param(params);
                str += '" class="page-next">下一页&nbsp;&gt;&gt;</a> ';
            }
            
            $el.html(str);
            
            if(typeof cbfn == "function"){
                cbfn.call(params);
            }
        },
        doInit: function (options, fn){
            this.render(options, fn);
        }
    }
});