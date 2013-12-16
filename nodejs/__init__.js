module.exports = function(baum){
    return new function(){
        var self = this;

        var desired = [
            'http',
            'https',
            'util',
            'os',
            'path',
            'fs',
            'url',
            'crypto',
            'zlib',
            'buffer',
            'events',
            'querystring',
            'child_process',

            'async',
            'buffalo',
            'msgpack',
            'sqlite3',
            'memwatch',
            'uuid',
        ];
        for(var i in desired){
            try{
                this[desired[i]] = require(desired[i]);
            } catch(e){
                this[desired[i]] = null;
            };
        };

        return this;
    };
};
