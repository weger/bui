var http = require("http"),
    url  = require("url"),
    path = require("path"),
    zlib = require("zlib"),
    fs   = require("fs");

var EXPIRES = {
        "fileMatch": /^(gif|png|jpg|js|css|html)$/ig,
        "maxAge": 60 * 60 * 24 * 365
    },
    COMPRESS = {
        "match": /css|js|html|jpg|gif|png/ig
    },
    DEFAULT = {
        "file": "index.html"
    },
    MIMETYPES = {
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
    },
    PRFIXPATH = process.cwd(); //"D:/workspace/hrlms";//
    params = require(path.join(PRFIXPATH, "./.config")).Server;
module.exports = webserver;

function webserver(port) {
    var dir = path.join(PRFIXPATH, "./");
    var tport = params.port;
    if (!isNaN(port)) {
       var tport = port;
    }
    var host = '127.0.0.1';

    var server = http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname;
        
        if (path.extname(pathname) == "") {
            pathname+="/";
        }
        if (pathname.charAt(pathname.length-1) === "/") {
            pathname += DEFAULT.file;
        }

        realPath = path.join(dir, path.normalize(pathname));
        //匹配忽略列表，若匹配直接抛给回调函数
        if (params.ignoreRegExp && req.url.match(params.ignoreRegExp)) {
            console.log("ignore request:" + req.url);
            if (typeof transpond === "function") {
                //调用转发服务器
                transpond(req, res);
            }
            return false;
        }

        var pathHandle = function (realPath) {
            fs.stat(realPath, function (err, stats) {
                if (err) {
                    if (typeof transpond === "function") {
                        transpond(req, res);
                    } else {
                        console.log(req.url + " 404");
                        res.writeHead(404, {"Content-Type": "text/plain"});
                        res.write("This request URL " + pathname + " was not found on this server.");
                        res.end();
                    }
                } else {
                    if (stats.isDirectory()) {
                        realPath = path.join(realPath, "/", DEFAULT.file);
                        pathHandle(realPath);
                    } else {
                        res.setHeader('Accept-Ranges', 'bytes');
                        var ext = path.extname(realPath);
                        ext = ext ? ext.slice(1) : 'unknown';
                        var contentType = MIMETYPES[ext] || "text/plain";
                        res.setHeader("Content-Type", contentType);
                        var lastModified = stats.mtime.toUTCString();
                        var ifModifiedSince = "If-Modified-Since".toLowerCase();
                        res.setHeader("Last-Modified", lastModified);
                        //jsp动态文件支持
                        if (ext === "jsp") {
//                            var content = fs.readFileSync(realPath, "utf-8");
//                            content = content.replace(/<%@ page.*|.*%>/g, "");
//                            content = content.replace(/<jsp:include page="(.*)"\/>/g, function (strpath) {
//                                return fs.readFileSync(path.join(path.dirname(realPath), strpath.replace(/^[^"]+"|"[^"]+$/g,"")), "utf-8");
//                            });
//                            res.write(content);
//                            res.end();
//                            return false;
                        }
                        //php动态文件支持
                        if (ext === "php") {
                            //
                        }
                        if (ext.match(EXPIRES.fileMatch)) {
                            var expires = new Date();
                            expires.setTime(expires.getTime() + EXPIRES.maxAge * 1000);
                            res.setHeader("Expires", expires.toUTCString());
                            res.setHeader("Cache-Control", "max-age=" + EXPIRES.maxAge);
                        }
                        if (req.headers[ifModifiedSince] && lastModified === req.headers[ifModifiedSince]) {
                            //console.log(req.url + " 304");
                            res.writeHead(304, "Not Modified");
                            res.end();
                        } else {
                            var compressHandle = function (raw, statusCode, reasonPhrase) {
                                var stream = raw;
                                var acceptEncoding = req.headers['accept-encoding'] || "";
                                var matched = ext.match(COMPRESS.match);
                                if (matched && acceptEncoding.match(/\bgzip\b/)) {
                                    res.setHeader("Content-Encoding", "gzip");
                                    stream = raw.pipe(zlib.createGzip());
                                } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                                    res.setHeader("Content-Encoding", "deflate");
                                    stream = raw.pipe(zlib.createDeflate());
                                }
                                //console.log(req.url + " " + statusCode);
                                res.writeHead(statusCode, reasonPhrase);
                                stream.pipe(res);
                            };
                            var raw = {};
                            if (req.headers["range"]) {
                                var range = parseRange(req.headers["range"], stats.size);
                                if (range) {
                                    res.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stats.size);
                                    res.setHeader("Content-Length", (range.end - range.start + 1));
                                    raw = fs.createReadStream(realPath, {"start": range.start, "end": range.end});
                                    compressHandle(raw, 206, "Partial Content");
                                } else {
                                    //console.log(req.url + " 416");
                                    res.removeHeader("Content-Length");
                                    res.writeHead(416, "Request Range Not Satisfiable");
                                    res.end();
                                }
                            } else {
                                raw = fs.createReadStream(realPath);
                                compressHandle(raw, 200, "Ok");
                            }
                        }
                    }
                }
            });
        };
        pathHandle(realPath);

    });
    
    server.on('error', function (e){
        console.log(e);
        console.log('['+tport+']端口已用，请换个端口重试：\n bui server [port]');
    });

    server.listen(tport, host);
    
    console.log("服务器已启动，地址：http://127.0.0.1:"+ tport +"/");
};


function parseRange(str, size) {
    if (str.indexOf(",") !== -1) {
        return;
    }
    var range = str.split("-"),
        start = parseInt(range[0], 10),
        end = parseInt(range[1], 10);
    // Case: -100
    if (isNaN(start)) {
        start = size - end;
        end = size - 1;
        // Case: 100-
    } else if (isNaN(end)) {
        end = size - 1;
    }
    // Invalid
    if (isNaN(start) || isNaN(end) || start > end || end > size) {
        return;
    }
    return {start: start, end: end};
};

function transpond(req, res) {
    delete require.cache[path.join(PRFIXPATH, "./.config")];
    var transRules = require(path.join(PRFIXPATH, "./.config")).TranspondRules;
    if (transRules.ajaxOnly && !req.headers.accept.match(/application\/json, text\/javascript/)) {
        res.writeHead("404");
        res.write("404");
        res.end();
        console.log("transpond \033[31m%s\033[m canceled, modify the config.js to transpond this.", req.headers.host + req.url);
        return false;
    }
    var transCurrent = transRules;
    if (!transCurrent) {
        console.error('The transponding rules of port"' + port + '" is not defined, please check the config.js!');
        return false;
    }
    var options = {
        host: transCurrent.targetServer.host,
        port: transCurrent.targetServer.port || 80
    };
    options.headers = req.headers;
    options.path = req.url;
    options.method = req.method;
    //匹配regExpPath做特殊转发
    var i;

    for (i in transCurrent.regExpPath) {
        if (req.url.match(i)) {
            options.host = transCurrent.regExpPath[i].host || options.host;
            options.port = transCurrent.regExpPath[i].port || options.port;
            options.path = req.url.replace(i, transCurrent.regExpPath[i].path);
            if (transCurrent.regExpPath[i].attachHeaders) {
                var j;
                for (j in transCurrent.regExpPath[i].attachHeaders) {
                    options.headers[j] = transCurrent.regExpPath[i].attachHeaders[j];
                }
            }
            break;
        }
    }

    console.log("transpond \033[31m%s\033[m to \033[35m%s\033[m", req.headers.host + req.url, options.host + ":" + options.port + options.path);
    var serverReq = http.request(options, function (serverRes) {
        //console.log(req.url + " " + serverRes.statusCode);
        res.writeHead(serverRes.statusCode, serverRes.headers);
        serverRes.on('data', function (chunk) {
            res.write(chunk);
        });
        serverRes.on('end', function () {
            res.end();
        });
    });

    serverReq.on('error', function (e) {
        console.error('problem with request: ' + e.message);
    });

    req.addListener('data', function (chunk) {
        serverReq.write(chunk);
    });

    req.addListener('end', function () {
        serverReq.end();
    });
};

//调试专用
//webserver()