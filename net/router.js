/*
 * a chainable router, aka handler finder.
 *
 * /a       will be handled at the 1st handler, and return the function
 *          registered under name 'a'.
 * /a/      will be handled at the 2nd handler, and return the function
 *          registered under name ''.
 * /a/b     will be handled at the 2nd handler, and return the function
 *          registered under then name 'b'.
 *
 * usage:
 *  var rootRouter = new Router(),
 *      bRouter = new Router();
 *  rootRouter.handle('', function(){console.log('Homepage.')});
 *  rootRouter.sub('b', bRouter);
 *  bRouter.handle('b', [FUNCTION]);
 *
 *  rootRouter('/a/b'); // returns a function, or false, if not found.
 */

function router($){
    var self = this;

    var handlers = {}, subRouters = {};

    function find(url){
        var parsed = $.nodejs.url.parse(url),
            urlPathname = parsed.pathname;
        var parser = /^\/([^\/]*)(.*)$/;

        var exec = parser.exec(urlPathname);

        // no handler found
        if(null == exec) return false;

        var current = exec[1], next = exec[2];
        if(next){
            // take 'current' as the name of a subRouter.
            if(undefined == subRouters[current]) return false;
            return subRouters[current](next);
        } else {
            // take 'current' as the name of a handler.
            if(undefined == handlers[current]) return false;
            return handlers[current];
        };
    };

    find.handle = function(name, func, options){
        if(undefined != options)
            func.__options = options;
        handlers[name] = func;
        return find;
    };

    find.sub = function(name, subRouter){
        subRouters[name] = subRouter;
        return find;
    };

    return find;
};

module.exports = function(baum){
    return function(){
        return new router(baum);
    };
};
