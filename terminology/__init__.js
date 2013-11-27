/*
 * A system for regulating and simplifing the cipher text.
 */
var woerterbuch = [
    'ciphertext',
    'plaintext',
    'compress.algorithm',
    'compress.use',
    'key',
    'key.hint',
    'hmac',
];

function terminology(umgangssprache){
    try{
        var i = woerterbuch.indexOf(umgangssprache.trim().toLowerCase());
        if(i >= 0)
            return i;
        return null;
    } catch (e){
        return null;
    };
};

terminology.reverse = function(i){
    var r = woerterbuch[i];
    if(undefined == r) return null;
    return r;
};

terminology.compress = function(obj){
    var result = {};
    for(var i in obj){
        var term = terminology(i);
        if(null == term) continue;
        result[term] = obj[i];
    };
    return result;
};

terminology.uncompress = function(obj){
    var result = {};
    for(var i in obj){
        var term = terminology.reverse(i);
        if(null == term) continue;
        result[term] = obj[i];
    };
    return result;
};

module.exports = function(baum){ 
    return terminology;
};
