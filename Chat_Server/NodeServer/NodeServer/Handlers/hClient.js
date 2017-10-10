

var hClient = (function () {
    var _connect = function (socket,data) {
        console.log("========== CONNECTED =========");

    };

    var _disconnect = function (socket,data) {
        console.log("========== DISCONNECTED =========");

    };

    return{
        connect:_connect
        ,disconnect:_disconnect
    };
})();
module.exports = hClient;