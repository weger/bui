Bui
==========


Bui是一个通用模块化前端开发平台，提供了常用的项目构建、调试、优化等一系列开发时的支持,只为提升开发效率。


安装与更新
-------

bui已经发布到npm上，可以通过下面的npm命令安装。`-g`选项是必须选项，使用`-g`全局安装后，可以获得command line的`bui`命令。在Linux/Mac平台下，全局安装可能需要`sudo`。

    $ [sudo] npm install -g bui

如果想要升级当前bui的版本，请运行如下命令。在Linux/Mac平台下，升级可能需要`sudo`。

    $ [sudo] npm update -g bui


使用
------

我们推荐通过命令行的方式使用bui。直接命令行下执行bui将显示可以调用的命令，包含内建命令和用户定制的命令。

    $ bui
    Usage: bui <command>

    Builtin Commands:

    install         构建项目
    server          用于开发时调试的WebServer
    release         发布项目

    Options:
    -h, --help     显示帮助信息
    -v, --version  将显示当前bui的版本号

