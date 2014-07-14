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
    var config = {
        "folder": path.join(process.cwd(), "/tpls/"),
        "fileType": ["html", "htm", "tpl"],
        "outputFile": path.join(process.cwd(), "/js/common/","tpls.js")
    }

    var content = "define({\r\n";
    var thisFile = [];
    var thisExt = "";
    var thisName = "";

    var inArray = function(str, arr) {
        var flag = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === str) {
                flag = true;
            }
        };
        return flag;
    }
    console.log("开始合并文件：");

    var files = fs.readdirSync(config.folder);

    if(!files){
        config.folder = config.folder.replace("tpls", "templates");
    }
    console.log("tpls不存在，尝试templates目录...");
    
    files = fs.readdirSync(config.folder);

    files.forEach(function(file) {
        console.log(file);
        thisFile = file.split(".");
        thisName = thisFile[0];
        thisExt = thisFile[thisFile.length - 1];

        if (inArray(thisExt, config.fileType)) {
            content += "    '";
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
    content += "});";
    
    fs.open(config.outputFile, "w", function(e, fd) {
        fs.writeSync(fd, content);
        fs.closeSync(fd);

        console.log("合并文件完成，已生成文件到：\n"+config.outputFile);
    });
}