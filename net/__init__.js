module.exports = function(baum){
    var self = this;

    var ipcServer = new require('./ipc.server.js')(baum),
        ipcClient = new require('./ipc.client.js')(baum),
        httpServer = new require('./http.server.js')(baum);

    this.IPC = {
        server: ipcServer.createServer,
        client: ipcClient.createClient,
    };

    this.HTTP = {
        server: httpServer.createServer,
    };

    return this;
};
