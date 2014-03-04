var http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs   = require("fs");

module.exports = webserver;

function webserver(port){
    var dir = path.join(process.cwd(), "./");
    var tport = 8888;
    var host = '127.0.0.1';

    if(!!port){
        tport = port;
    }

    var server = http.createServer(function (req, res) {
        var pathname = dir + url.parse(req.url).pathname;
        
        if (path.extname(pathname)=="") {
            pathname+="/";
        }
        if (pathname.charAt(pathname.length-1)=="/"){
            pathname+="index.html";
        }

        var mimeTypes = {
            "css": "text/css",
            "gif": "image/gif",
            "html": "text/html",
            "ico": "image/x-icon",
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "js": "text/javascript",
            "json": "application/json",
            "pdf": "application/pdf",
            "png": "image/png",
            "svg": "image/svg+xml",
            "swf": "application/x-shockwave-flash",
            "tiff": "image/tiff",
            "txt": "text/plain",
            "wav": "audio/x-wav",
            "wma": "audio/x-ms-wma",
            "wmv": "video/x-ms-wmv",
            "xml": "text/xml"
        };
    
        fs.exists(pathname,function(exists){
            if(exists){
                var ext = path.extname(pathname);
                    ext = ext ? ext.slice(1) : 'unknown';

                var contentType = mimeTypes[ext] || "text/plain";
                
                res.writeHead(200, {'Content-Type': contentType});

                fs.readFile(pathname,function (err,data){
                    res.end(data);
                });
            } else {
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end("<h1>404 Not Found</h1>");
            }
        });
    });
    
    server.on('error', function (e){
        console.log(e);
        console.log('['+tport+']端口已用，请换个端口重试：\n bui server [port]');
    });

    server.listen(tport, host);
    
    console.log("服务器已启动，地址：http://127.0.0.1:"+ tport +"/");
}