function client(baum, socketPath){
    var self = this;
    baum.nodejs.events.EventEmitter.call(this);

    this.request = function(){
        var request = http.request(
            {
                socketPath: socketPath,
            },
            function(response){
                response.on('data', function(chunk){
                    console.log(chunk);
                });
            }
        );

        request.on('error', function(e){
            console.log('ERR',e);
        });

        request.write('data');
        request.end();
    };

    return this;
};

module.exports = function(baum){
    var self = this;
    baum.nodejs.util.inherits(client, baum.nodejs.events.EventEmitter);
    
    this.createClient = function(socketPath){
        return new client(baum, socketPath);
    };

    return this;
};