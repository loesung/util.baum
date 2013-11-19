module.exports = function(baum){
    var self = this;

    var desired = [
        'http',
        'https',
        'util',
        'os',
        'fs',
        'crypto',
        'zlib',
        'buffer',
        'events',
    ];
    for(var i in desired){
        this[desired[i]] = require(desired[i]);
    };

    return this;
};
