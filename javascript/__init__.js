module.exports = function(){
    var errTypes = ['DEBUG', 'ERROR', 'WARNING', 'NOTICE'];
    function report(type){
        return function(){
            var msg = type + '\n' + this.toString() + '\n';
            $.nodejs.util.log(msg);
        };
    };

    String.prototype.DEBUG = report('DEBUG');
    String.prototype.ERROR = report('ERROR');
    String.prototype.WARNING = report('WARNING');
    String.prototype.NOTICE = report('NOTICE');
};
