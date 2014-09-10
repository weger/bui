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
        "i18n": 'tools/i18n',
        'urlParser': "tools/urlParser",
        'dataLoader': "tools/dataLoader",
        'jquery.tmpl': 'tools/jquery.tmpl',
    },
    optimize: "uglify",
    optimizeCss: "standard",
    modules: [
        {
            name: 'common',
            include: ['urls', 'tpls', 'pagination', 'i18n!nls/lang']
        },
        {
            name: 'tools',
            include: ['utils', "i18n", "dataLoader", 'urlParser', 'jquery.tmpl', 'i18n!nls/lang'],
            exclude: ['jquery']
        },
        {
            name: 'index',
            include: ['modules/list'],
            exclude: ['common', 'tools', 'i18n!nls/lang']
        }
    ],
    fileExclusionRegExp: /^\.|^datas|^build|admin|html5\.js/
})