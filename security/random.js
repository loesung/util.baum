module.exports = function(baum){
    return new function(){
        var self = this;

        this.bytes = function(length, callback){
            var task = [
                function(rueckruf){
                    baum.nodejs.crypto.randomBytes(length, rueckruf);
                },

                function(rueckruf){
                    var hrtimes = [];
                    for(var i=0; i<Math.ceil(length / 10); i++)
                        hrtimes.push(process.hrtime());
                    rueckruf(
                        null,
                        new $.nodejs.buffer.Buffer(hrtimes.toString())
                    );
                },

            ];
            baum.nodejs.async.parallel(task, function(err, result){
                if(null != err){
                    callback(err);
                    return;
                };
    
                var p1 = result.shift();
                var p2 = baum.nodejs.buffer.Buffer.concat(result);

                baum.nodejs.crypto.pbkdf2(
                    p2,
                    p1,
                    4,
                    length,
                    callback
                );
            });
        };
    };
};
