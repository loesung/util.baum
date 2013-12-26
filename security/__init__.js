module.exports = function(baum){
    return new function(){
        var self = this;

        this.uuid = require('./uuid.js')(baum);
        this.random = require('./random.js')(baum);

//        :: deprecated ::
//        this.object = require('./object.js')(baum);
    };
};
