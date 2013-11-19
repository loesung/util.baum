$ = (function(){
    var self = this;
    this.nodejs = new require('./nodejs/__init__.js')(self);

    this.ipc = new require('./ipc/__init__.js')(self);
    return this;
})();
