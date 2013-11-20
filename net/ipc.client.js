var client = function(baum, socketPath){
    var self = this;
    baum.nodejs.events.EventEmitter.call(this);

    this.request = function(path, options){
        var requestOptions = {
            path: path,
            socketPath: socketPath,
            method: 'GET',
        };

        if(undefined != options.post){
            requestOptions.method = 'POST';
        };

        var request = http.request(
            requestOptions,
            function(response){
                self.response = response;
                response.on('data', function(chunk){
                    self.emit('data', chunk);
                });
                response.on('end', function(chunk){
                    self.emit('end', chunk);
                });
            }
        );

        request.on('error', function(e){
            console.log('ERR',e);
        });

        if(undefined != options.post) request.write(options.post);
        request.end();
    };

    return this;
};

module.exports = function(baum){
    baum.nodejs.util.inherits(client, baum.nodejs.events.EventEmitter);
    return new function(){
        var self = this;
        this.createClient = function(socketPath){
            return new client(baum, socketPath);
        };

        return this;
    };
};
