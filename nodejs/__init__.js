module.exports = (function(){
    var self = this;

    var desired = ['http', 'https', 'util'];
    for(var i in desired){
        this[desired[i]] = require(desired[i]);
    };

    return this;
})();
