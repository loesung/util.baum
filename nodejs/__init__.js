module.exports = function(baum){
    return new function(){
        var self = this;

        var desired = [
            'http',
            'https',
            'util',
            'os',
            'fs',
            'url',
            'crypto',
            'zlib',
            'buffer',
            'events',
            'querystring',
        ];
        for(var i in desired){
            this[desired[i]] = require(desired[i]);
        };

        return this;
    };
};
