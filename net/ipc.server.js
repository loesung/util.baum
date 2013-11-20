var packet = require('./packet.js');

var server = function(baum, socketPath){
    var self = this;
    baum.nodejs.events.EventEmitter.call(this);

    var server = null;

    function serverLogic(request, response){
        self.emit('data', new packet(baum, 'ipc', request, response));
    };

    this.start = function(){
        function initServer(){
            server = baum.nodejs.http.createServer(serverLogic);
            server.listen(socketPath);
        };

        function unlinkAndStart(){
            baum.nodejs.fs.unlink(socketPath, function(){
                initServer();
            });
        };

        function checkIsSocket(err, lstatResult){
            if(null != err){
                self.emit('error');
                return;
            };
            if(!lstatResult.isSocket()){
                self.emit('error');
                return;
            };
            unlinkAndStart();
        };

        baum.nodejs.fs.exists(socketPath, function(exists){
            if(exists){
                baum.nodejs.fs.lstat(socketPath, checkIsSocket);
            } else
                initServer();
        });
    };

    return this;
};


module.exports = function(baum){
    return new function(){
        var self = this;
        baum.nodejs.util.inherits(server, baum.nodejs.events.EventEmitter);

        this.createServer = function(socketPath){
            return new server(baum, socketPath);
        };

        return this;
    };
};
