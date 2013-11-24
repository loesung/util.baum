$ = (function(){
    var self = this;

    var desired = {
        'nodejs': './nodejs/__init__.js',

        'net': './net/__init__.js',
        'config': './config/__init__.js',
        'global': './global/__init__.js',
    };

    for(var name in desired)
        this[name] = require(desired[name])(self);

    return this;
})();
