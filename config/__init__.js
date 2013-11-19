function config(baum, path){
    var self = this;
    var testerName = /^[a-zA-Z0-9\.\-]{1,128}$/;
    var got = {};

    var index = baum.nodejs.fs.readFileSync(
        path + 'index.json',
        {encoding: 'utf-8'}
    );
    index = JSON.parse(index);

    for(var i in index){
        var item = index[i];
        var value = undefined;

        if(!testerName.test(item.name)) continue;

        if(!baum.nodejs.fs.existsSync(path + item.name)){
            if(undefined != item['default']) value = item['default'];
        } else {
            value = baum.nodejs.fs.readFileSync(
                path + item.name,
                {encoding: 'utf-8'}
            );
            value = value.trim();
            console.log(value);
        };

        //XXX verify the types, and so on.

        if(undefined != value) got[item.name] = value;
    };

    this.get = function(item){
        if(undefined != got[item])
            return got[item];
        else
            return undefined;
    };

    return this;
};

module.exports = function(baum){
    var self = this;

    this.createConfig = function(path){
        return new config(baum, path);
    };

    return this;
};
