module.exports = function(baum){
    var self = this;

    var server = new require('./server.js')(baum),
        client = new require('./client.js')(baum);

    this.createServer = server.createServer;
    this.createClient = client.createClient;

    return this;
};
