var http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs   = require("fs");


module.exports = webserver;

function webserver(port){
    var dir = __dirname.replace("build", "src");
    var pathname=dir+url.parse(req.url).pathname;
    var port = port || 8888;
    
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
     
    }).listen(port, "127.0.0.1");
     
    console.log("Server running at http://127.0.0.1:"+ port +"/");
}
