({
    appDir: "../",
    baseUrl: "./js",
    dir: '../../release',
    keepBuildDir: false,
    skipModuleInsertion: true,
    removeCombined: true,
    paths: {
        'urls': "common/urls",
        'tpls': "common/tpls",
        'pagination' : "common/pagination",
        'jquery': 'require-jquery',
        'utils': "tools/utils",
        'urlParser': "tools/urlParser",
        'dataLoader': "tools/dataLoader",
        'jquery.tmpl': 'tools/jquery.tmpl',
    },
    optimize: "uglify",
    optimizeCss: "standard",
    modules: [
        {
            name: 'common',
            include: ['urls', 'tpls', 'pagination']
        },
        {
            name: 'tools',
            include: ['utils', "dataLoader", 'urlParser', 'jquery.tmpl'],
            exclude: ['jquery']
        },
        {
            name: 'index',
            include: ['modules/list'],
            exclude: ['common', 'tools']
        }
    ],
    fileExclusionRegExp: /^\.|^datas|^build|admin|html5\.js/
})