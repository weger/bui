/**
 * @module utils
 * 
 * @name 工具
 * @version 1.0.0
 */



define(function () {
    return {
        getLengthByByte: function (source) {
            return source.replace(/[^\x00-\xff]/g,'aa').length || 0;
        },
        isLengthOverflow: function (source, length) {
            if(source.replace(/[^\x00-\xff]/g,'aa').length > length){
                return true;
            }
            return false;
        },
        substrByByte: function (source, length){
            if(source.replace(/[^\x00-\xff]/g,'aa').length > length){
                return (source+'').substr(0,length).replace(/([^\x00-\xff])/g,'$1 ').substr(0,length).replace(/([^\x00-\xff]) /g,'$1')+"...";
            }else {
                return source;
            }
        },
        timeToDay: function (data){
            // 2013-11-29 17:41:51 to 前天、昨天、今天
            var d = new Date(data.replace(/-/g, "/"));
            
            var today = new Date();
            var before = new Date().setDate(new Date().getDate()-2);
            var yesterday = new Date().setDate(new Date().getDate()-1);
            

            var toStr = function (dd){
                var dataArr = [];
                dataArr[0] = new Date(dd).getFullYear();
                dataArr[1] = new Date(dd).getMonth()+1;
                dataArr[2] = new Date(dd).getDate();

                return dataArr.join("-");
            }
            var dStr,todayStr,yesterdayStr,beforeStr;

            dStr = toStr(d);
            todayStr = toStr(today);
            yesterdayStr = toStr(yesterday);
            beforeStr = toStr(before);

            if(dStr == todayStr){
                return "今天";
            }else if(dStr == yesterdayStr){
                return "昨天";
            }else if(dStr == beforeStr){
                return "前天";
            }else{
                return dStr;
            }

        },
        timeDelymd: function (data){
            // 2013-11-29 17:41:51 to 2013-11-29
            // for ie  2013-11-29 to 2013/11/29
            var dataArr = [];
            var d = new Date(data.replace(/-/g, "/"));

            dataArr[0] = d.getFullYear();
            dataArr[1] = d.getMonth()+1;
            dataArr[2] = d.getDate();

            return dataArr.join("-");
        },
        outlineTimeFormat: function (startTime, endTime){
            // 2013-11-29 17:41:51  to 11月29日 17:41
            var startMonth = parseInt(startTime.substr(5, 2), 10);
            var startDay = parseInt(startTime.substr(8, 2), 10);
            var startHour = startTime.substr(11,5);
            var endMonth = parseInt(endTime.substr(5, 2), 10);
            var endDay = parseInt(endTime.substr(8, 2), 10);
            var endHour = endTime.substr(11,5);
            
            if (startMonth==endMonth && startDay==endDay) {
                return startMonth+"月"+startDay+"日 "+startHour+" - "+endHour;
            } else {
                return startMonth+"月"+startDay+"日 "+startHour+" - "+endMonth+"月"+endDay+"日 "+endHour;
            }
        },
        answerListTimeFormat: function (times) {
            //seconds to YYYY-MM-DD hh:mm
            var answerTime = new Date(parseInt(times, 10));
            return answerTime.getFullYear()+'-'+(answerTime.getMonth()+101).toString().substr(1)+'-'+(answerTime.getDate()+100).toString().substr(1)+' '+(answerTime.getHours()+100).toString().substr(1)+":"+(answerTime.getMinutes()+100).toString().substr(1);
        },
        commentListTimeFormat: function (times) {
            //seconds to YYYY-MM-DD hh:mm:ss
            var answerTime = new Date(parseInt(times, 10));
            return answerTime.getFullYear()+'-'+(answerTime.getMonth()+101).toString().substr(1)+'-'+(answerTime.getDate()+100).toString().substr(1)+' '+(answerTime.getHours()+100).toString().substr(1)+":"+(answerTime.getMinutes()+100).toString().substr(1)+":"+(answerTime.getSeconds()+100).toString().substr(1);
        },
        relateListTimeFormat: function (times) {
            //seconds to YYYY-MM-DD
            var answerTime = new Date(parseInt(times, 10));
            return answerTime.getFullYear()+'-'+(answerTime.getMonth()+101).toString().substr(1)+'-'+(answerTime.getDate()+100).toString().substr(1);
        },
        timePeriod: function (start, end) {
            //计算持续时间，以分为单位
            var startDate = new Date(start.replace(/-/g, "/"));
            var endDate = new Date(end.replace(/-/g, "/"));

            return Math.round((endDate.getTime()-startDate.getTime())/60000);
        },
        timePeriodSecond: function (start, end) {
            //计算持续时间，以秒为单位
            //utils.timePeriodSecond("2013-12-09 15:43:41", "2013-12-13 16:39:50")
            // 348969 s
            var startDate = new Date(start.replace(/-/g, "/"));
            var endDate = new Date(end.replace(/-/g, "/"));

            return Math.round((endDate.getTime()-startDate.getTime())/1000);
        },
        secondToHour: function (seconds) {
            // utils.secondToHour(348969)
            // "96:56:9"
            var hour = ~~(seconds / 3600);
            var minute = ~~(( seconds - 3600 * hour ) / 60);
            var second = seconds - 3600 * hour - 60 * minute;
            return hour + ':' + minute + ':' + second;
        },
        getTimePeriodFormatted: function (start, end) {
            // utils.getTimePeriodFormatted("2013-12-09 15:43:41", "2013-12-13 16:39:50")
            // "96:56:9"
            var startDate = new Date(start.replace(/-/g, "/"));
            var endDate = new Date(end.replace(/-/g, "/"));

            var seconds = Math.round((endDate.getTime()-startDate.getTime())/1000);
            var hour = ~~(seconds / 3600);
            var minute = ~~(( seconds - 3600 * hour ) / 60);
            var second = seconds - 3600 * hour - 60 * minute;

            if ( second < 10 ) {
                second = '0' + second;
            }
            if ( minute < 10 ) {
                minute = '0' + minute;
            }
            if ( hour < 10 ) {
                hour = '0' + hour;
            }
            return hour + ':' + minute + ':' + second;
        },
        getMinutes: function (start, end) {
           var startDate = new Date(start.replace(/-/g, "/"));
            var endDate = new Date(end.replace(/-/g, "/"));

            var seconds = Math.round((endDate.getTime()-startDate.getTime())/1000);
            return Math.ceil(seconds / 60);
        },
        getliveSoonFormat:function ( beginTime, currentTime ) {
            var startDate = new Date(beginTime.replace(/-/g, "/"));
            var endDate = new Date(currentTime.replace(/-/g, "/"));
            if ( startDate.getFullYear() == endDate.getFullYear()
                && startDate.getMonth() == endDate.getMonth()
                && startDate.getDate() == endDate.getDate() ) {

                return (startDate.getHours() < 10 ? '0' + startDate.getHours(): startDate.getHours())
                + ':' + (startDate.getMinutes() < 10 ? '0' + startDate.getMinutes(): startDate.getMinutes());
            } else if (startDate.getFullYear() == endDate.getFullYear()
                && startDate.getMonth() == endDate.getMonth()
                && startDate.getDate() == endDate.getDate() + 1 ) {
                return '明天' + (startDate.getHours() < 10 ? '0' + startDate.getHours(): startDate.getHours())
                + ':' + (startDate.getMinutes() < 10 ? '0' + startDate.getMinutes(): startDate.getMinutes());
            }

            return (startDate.getMonth() + 1) + "月" + startDate.getDate() + "日 " + (startDate.getHours() < 10 ? '0' + startDate.getHours(): startDate.getHours())
                + ':' + (startDate.getMinutes() < 10 ? '0' + startDate.getMinutes(): startDate.getMinutes());
        },
        getMonthAndDate: function (time) {
           var date = new Date(time.replace(/-/g, "/"));
           return (date.getMonth() + 1) + "月" + date.getDate() + "日";
        },
        formatTag: function (str) {
            if(!!str){
                var div = document.createElement('div');
                div.innerHTML = str;
                var decoded = div.firstChild.nodeValue;
                return decoded;

                //return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\'").replace(/&amp;nbsp;/g, " ");
            }else{
                return "";
            }
        },
        encodeQuestionTag: function (str) {
            if (str) {
                return str;
            } else {
                return "";
            }
        },
        decodeQuestionTag: function (str) {
            if(!!str){
                return $('<div></div>').append(str.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/(<[^<>]*)style=\"?[^"]*(e(\/\*.*\*\/)?x(\/\*.*\*\/)?p(\/\*.*\*\/)?r(\/\*.*\*\/)?e(\/\*.*\*\/)?s(\/\*.*\*\/)?s(\/\*.*\*\/)?i(\/\*.*\*\/)?o(\/\*.*\*\/)?n|b(\/\*.*\*\/)?e(\/\*.*\*\/)?h(\/\*.*\*\/)?a(\/\*.*\*\/)?v(\/\*.*\*\/)?i(\/\*.*\*\/)?o(\/\*.*\*\/)?r)[^"]*\"?([^<>]*>)/ig, "$1$19")).html();
            }else{
                return "";
            }
        },
        decodeQuestionTag2: function (str) {
            if(!!str){
                return $('<div></div>').append(str.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/(<[^<>]*)style=\"?[^"]*(e(\/\*.*\*\/)?x(\/\*.*\*\/)?p(\/\*.*\*\/)?r(\/\*.*\*\/)?e(\/\*.*\*\/)?s(\/\*.*\*\/)?s(\/\*.*\*\/)?i(\/\*.*\*\/)?o(\/\*.*\*\/)?n|b(\/\*.*\*\/)?e(\/\*.*\*\/)?h(\/\*.*\*\/)?a(\/\*.*\*\/)?v(\/\*.*\*\/)?i(\/\*.*\*\/)?o(\/\*.*\*\/)?r)[^"]*\"?([^<>]*>)/ig, "$1$19")).text();
            }else{
                return "";
            }
        },
        filterIntro: function (htmlStr) {
            return $("<div></div>").append(htmlStr.replace(/&gt;|&lt;/g, function (value) {
                if (value == "&gt;") {
                    return ">";
                } else {
                    return "<";
                }
            })).text();
        },
        checkAnswerSummary: function (str) {
            if (str.replace(/&amp;/g, "&").length > 138 && str.match(/\.{3}$/)) {
                return true;
            } else {
                return false;
            }
        }
    }
});