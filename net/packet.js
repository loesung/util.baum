function packet(baum, request, response){
    var self = this;

    this.request = request;
    this.response = response;

    this.url = baum.nodejs.url.parse(this.request.url);

    this.write = function(p1, p2){
        self.response.write(p1, p2);
    };

    this.end = function(p){
        self.response.end(p);
    };

    return this;
};

module.exports = packet;
