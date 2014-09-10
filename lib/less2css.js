var fs = require('fs'),
    path = require('path'),
    less = require('./less/index');

module.exports = less2css;

function less2css(){
    var lessFolder = path.join(process.cwd(),'less');
    var cssFolder = path.join(process.cwd(),'css');

    fs.readdir(lessFolder,function(err,files){
        if(err) throw err;

        files.forEach(function(file){
            fs.readFile(path.join(lessFolder,file),'utf-8',function(err,data){
                if (err) throw err;

                var dest = path.join(cssFolder,path.basename(file,'.less')) + '.css';
                less.render(data,function(err,css){
                    fs.writeFile(dest, css, function (err) {
                        if (err) throw err;
                        console.log('已生成css文件'+path.basename(file,'.less')+'.css');
                    });
                });

            })
        })
    });
};