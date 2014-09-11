var fs = require('fs'),
    path = require('path'),
    less = require('./less/index');

module.exports = less2css;

function less2css(){
    var cssFolder = path.join(process.cwd(),'css');

    //less转成同名css
    fs.readdir(cssFolder,function(err,files){
        if(err) throw err;


        files.forEach(function(file){
           if(path.extname(file) === ".less"){

               fs.readFile(path.join(cssFolder,file),'utf-8',function(err,data){
                   if (err) throw err;

                   var dest = path.join(cssFolder,path.basename(file,'.less')) + '.css';
                   less.render(data,function(err,css){
                       fs.writeFile(dest, css, function (err) {
                           if (err) throw err;
                           console.log('已生成css文件'+path.basename(file,'.less')+'.css');
                       });
                   });

               })
           }
        })
    });

    //将html里的.less文件换成.css

    fs.readdir(process.cwd(),function(err,files){
        if(err) throw err;
        files.forEach(function(file){
            if(path.extname(file) === ".html"){
                fs.readFile(path.join(process.cwd(),file) , 'utf-8',function(err,data){
                    var reg = /<link\s+[\s\S]*?["'\s\w\/\-](?:>|$)/ig;

                    var lessLink = data.match(reg)[0];
                    var cssLink = lessLink.replace(/.less/g,'.css');
                    console.log(cssLink);

                    var result = data.replace(lessLink,cssLink);

                    fs.writeFile(path.join(process.cwd(),file), result, 'utf-8',function(err){
                        if(err) throw err;
                        var hrefLocation = cssLink.split(" ")[3]
                        var fileLocation = hrefLocation.split("=")[1];
                        console.log("样式文件"+ fileLocation.replace(">"," ") +"替换完毕")
                    })
                } );
            }
        })
    });




};