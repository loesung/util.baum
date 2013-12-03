/*
 * define cryptographical objects
 */
function hmac($, algorithm, data, key, encoding){
    var digestor = new $.nodejs.crypto.createHmac(algorithm, key);
    data = new $.nodejs.buffer.Buffer(data, encoding);
    digestor.update(data);
    
    var buffer = digestor.digest();

    return buffer.toString('hex');
};

module.exports = function($){
    function standardHash(data, key){
        return hmac($, 'whirlpool', data, key);
    };

    return new function(){
        var self = this;

        this.get = {identity: {}};
        this.check = {identity: {}};
        this.definition = {
            identity: {
                id: '[0-9a-f]{128}',
                name: '[0-9a-zA-Z_\\(\\)\\[\\]\\.]{5,64}',
            },
        };

        this.get.identity.id = function(name){
            if(!self.check.identity.name(name)) return false;
            return standardHash(name, 'identity-id'); 
        };

        this.check.identity.id = function(id){
            return (
                new RegExp('^' + self.definition.identity.id + '$')
                .test(id)
            );
        };

        this.check.identity.name = function(name){
            return (
                new RegExp('^' + self.definition.identity.name + '$')
                .test(name)
            );
        };
    };
};
