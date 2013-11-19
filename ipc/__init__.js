var server = require('./server.js'),
    client = require('./client.js');

module.exports = function(baum){
    var self = this;

    this.createServer = function(socketPath){
        return new server(baum, socketPath);
    };

    this.createClient = function(socketPath){
    };

    return this;
};
