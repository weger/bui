#!/usr/bin/env node

var bui = require('../lib/commander'),
    install = require('../lib/install'),
    webserver = require('../lib/webserver'),
    release = require('../lib/release'),
    colors = require('../lib/colors');

//colors 全局设置所处可用
colors.setTheme({silly:"rainbow",input:'grey',verbose:'cyan',prompt:'grey',info:'green',data:'grey',help:'cyan',warn:'yellow',debug:'blue',error:'red'});
// 初始化项目信息
bui.command('install')
   .description(' - 新建一个项目,需要参数为新项目名称')
   .action(install);

bui.command("tplcombo")
   .description(" - 用于开发时合并模板文件")
   .option('-w,--watch','监听文件变化，及时合并')
   .action(webserver);

bui.command("server")
   .description(" - 用于开发时调试的WebServer" + "http://localhost:8888".warn)
   .option('-s,--port','启动端口号')
   .action(webserver);

bui.command('release')
   .description(" - 打包压缩优化所有文件，加版本戳防缓存，发布项目")
   .option('-d,--dest','发布目录，相对于当前的')
   .action(release);

bui.version(require('../package').version);
bui.parse(process.argv);

