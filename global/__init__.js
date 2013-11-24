module.exports = function(baum){
    return new function(){
        var self = this;
        this.storage = {};

        this.set = function(name, value){
            self.storage[name] = value;
            return self; 
        };

        this.get = function(name){
            if(undefined == self.storage[name])
                return null;
            return self.storage[name];
        };

        return this;
    };
};
