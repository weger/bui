/*
 * Author: z.w(weger)
 * Email: lovexctk@gmail.com
 * Data: 2014-02-28
 * It's distributed under the MIT license(http://mit-license.org).
 */


var path = require('path'),
    fs = require('fs'),
    wrench = require('./wrench'),
    util = require('util');


module.exports = install;

function install(project_name){
    var src = path.join(__dirname,"../tpl","base"),
        dest = path.join(process.cwd(), project_name);

    fs.exists(dest, function (exists) {
        if(exists){
            console.log("项目" + project_name + "已存在，请删除后重试！");
        }else{
            //todo 项目初始化描述
            console.log("  项目: " + project_name + " 创建中...\n");

            wrench.copyDirSyncRecursive(src, dest, {forceDelete: false});

            console.log("  已创建成功,cd `" + project_name + '` 开始编写您的项目' + "\n\n" + "  帮助请运行 `bui -h`");
        }
    });
}