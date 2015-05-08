/*
 * Author: z.w(weger)
 * Email: lovexctk@gmail.com
 * Data: 2014-02-28
 * It's distributed under the MIT license(http://mit-license.org).
 */



var fs = require("fs"),
    path = require("path");

module.exports = tplcombo;

function tplcombo(){
    var isWatch = this.args[0].watch;
    var isI18n = this.args[0].i18n;
    var isMin = this.args[0].min;
    var outputFileName = isMin ? "tpls.min.js" : "tpls.js";

    var config = {
        "folder": path.join(process.cwd(), "/tpls/"),
        "fileType": ["html", "htm", "tpl"],
        "outputFile": path.join(process.cwd(), "/js/common/", outputFileName)
    }

    var inArray = function(str, arr) {
        var flag = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === str) {
                flag = true;
            }
        };
        return flag;
    }

    var isExistsFolder = fs.existsSync(config.folder);

    if(!isExistsFolder){
        config.folder = config.folder.replace("tpls", "templates");
        console.log("tpls不存在，尝试templates目录...");
    }

    var combo = function (){
        var content = "define({\r\n";
        var thisFile = [];
        var thisExt = "";
        var thisName = "";

        if(isI18n){
            content = "define(['i18n!nls/lang'], function(lang) {\r\n";
            content += "    return {\r\n";
        }

        var files = fs.readdirSync(config.folder);

        console.log("开始合并文件：");
        files.forEach(function(file) {
            console.log(file);
            thisFile = file.split(".");
            thisName = thisFile[0];
            thisExt = thisFile[thisFile.length - 1];

            if (inArray(thisExt, config.fileType)){
                if(isI18n){
                    content += "        '";
                }else{
                    content += "    '";
                }
                content += thisName;
                content += "': ";
                content += "'";
                content += fs.readFileSync(config.folder + file).toString().replace(/\s+/g, " ");
                if (files[files.length - 1] !== file) {
                    content += "',\r\n";
                } else {
                    content += "'\r\n";
                }
            }
        });
        if(isI18n){
            content += "    }\r\n";
        }

        content += "});";

        fs.open(config.outputFile, "w", function(e, fd) {
            fs.writeSync(fd, content);
            fs.closeSync(fd);

            console.log("合并文件完成，已生成文件到：\n"+config.outputFile);
        });
    }

    if(isWatch){
        fs.watch(config.folder, function (event, filename){
            if(event == "change"){
                combo();
            }
        });
    }else{
        combo();
    }
}
