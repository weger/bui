requirejs.config({
    baseUrl: './js',
    paths: {
        'jquery': 'require-jquery',
        'utils': "tools/utils",
        'urlParser': "tools/urlParser",
        'dataLoader': "tools/dataLoader",
        'jquery.tmpl': 'tools/jquery.tmpl',
    },
    shim: {
        'jquery.tmpl': {
            deps : ['jquery']
        }
    }
});