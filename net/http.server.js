var packet = require('./packet.js');

var server = function(baum, port){
    var self = this;
    baum.nodejs.events.EventEmitter.call(this);

    var server = null;

    function serverLogic(request, response){
        self.emit('data', new packet(baum, request, response));
    };

    this.start = function(){
        function initServer(){
            server = baum.nodejs.http.createServer(serverLogic);
            server.listen(port);
        };

        initServer();
    };

    return this;
};


module.exports = function(baum){
    var self = this;
    baum.nodejs.util.inherits(server, baum.nodejs.events.EventEmitter);

    this.createServer = function(port){
        return new server(baum, port);
    };

    return this;
};
