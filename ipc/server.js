function server(baum, socketPath){
    var self = this;
    baum.nodejs.events.EventEmitter.call(this);

    var server = null;

    function serverLogic(request, response){
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

        function checkIsSocket(lstatResult){
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

baum.nodejs.util.inherits(server, baum.nodejs.events.EventEmitter);
module.exports = server;
