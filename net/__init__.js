module.exports = function(baum){
    var self = this;

    var ipcServer = new require('./ipc.server.js')(baum),
        ipcClient = new require('./ipc.client.js')(baum);

    this.IPC = {
        createServer: ipcServer.createServer,
        createClient: ipcClient.createClient,
    };

    this.HTTP = {
        createServer: null,
    };

    return this;
};
