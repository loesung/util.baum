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

        this.get = {identity: {}, tunnel: {}};
        this.check = {identity: {}, tunnel: {}};
        this.definition = {
            identity: {
                id: '[0-9a-f]{128}',
                name: '[0-9a-zA-Z_\\(\\)\\[\\]\\.]{5,64}',
            },
            tunnel: {
                id: '(internet|satellite|mobile).(im|email|web|etc).([a-z0-9]+).([0-9a-fA-F]+)\-([0-9a-fA-F]{16})',
                description: '[a-zA-z0-9\\s\\.\\?,;:\\(\\)\\-_]+',
            },
        };

        this.get.identity.id = function(name){
            if(!self.check.identity.name(name)) return false;
            return standardHash(name, 'identity-id'); 
        };

        this.get.tunnel.id = function(a,b,c,d,e){
            var id = a + '.' + b + '.' + c + '.' + d + '-' + e;
            var exec = 
                new RegExp('^' + self.definition.tunnel.id + '$').exec(id);
            if(!exec) return false;
            return id;
        };

        this.get.tunnel.description = function(desc){
            if(!self.check.tunnel.description(desc)) return false;
            return desc;
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

        this.check.tunnel.id = function(id){
            var parsed = (
                new RegExp('^' + self.definition.tunnel.id + '$')
                .exec(id)
            );
            if(null == parsed) return false;
            return {
                catalog: parsed[1],
                method: parsed[2],
                protocol: parsed[3],
                sequence: parsed[4],
                identity: parsed[5],
            };
        };

        this.check.tunnel.description = function(desc){
            return (
                new RegExp('^' + self.definition.tunnel.description + '$')
                .test(desc)
            );
        };
    };
};
