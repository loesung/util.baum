function server(baum, socketPath){
    var self = this;
    baum.nodejs.events.EventEmitter.call(this);

    var server = null;

    function serverLogic(request, response){
    };

    this.start = function(){
        server = baum.nodejs.http.createServer(serverLogic);
        server.listen(socketPath);
    };

    return this;
};

baum.nodejs.util.inherits(server, baum.nodejs.events.EventEmitter);
module.exports = server;
