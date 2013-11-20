var packet = function(baum, protocol, request, response){
    baum.nodejs.events.EventEmitter.call(this);
    var self = this;

    this.request = request;
    this.response = response;

    this.url = baum.nodejs.url.parse(this.request.url);
    this.url.protocol = protocol;

    this.write = function(p1, p2){
        self.response.write(p1, p2);
    };

    this.end = function(p){
        self.response.end(p);
    };

    this.method = this.request.method;

    /* Bind events to receive the posting data automatically. */
    if(this.method == 'post'){
        this.request.on('data', function(chunk){
            if(
                self.post.raw.length + chunk.length > 1048567
            ){
                try{
                    self.request.socket.destory();
                } catch(e){
                };
                self.request.end();
            } else
                self.post.raw += chunk;
        });
        this.request.on('end', function(){
            self.post.parsed = 
                baum.nodejs.querystring.parse(self.post.raw);
            self.addListener('newListener', function(e, listener){
                if(e == 'ready')
                    listener(self.post);
            });
            self.emit('ready', self.post);
        });
    };

    return this;
};

module.exports = function(baum){
    baum.nodejs.util.inherits(packet, baum.nodejs.events.EventEmitter);
    return new function(){
        this.createPacket = function(protocol, req, resp){
            return new packet(baum, protocol, req, resp);
        };
        return this;
    };
};
