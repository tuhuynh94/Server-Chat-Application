
var hRegister = require('../Handlers/hRegister');

exports = module.exports = function(io,socket,connection){
        //-------------------- sent request to get verification code
    socket.on('request', function (data) {
        socket.phone = data["phone"];
        hRegister.request(socket, data,connection);
    });
    //-------------------- sent verification code to verification
    socket.on('respose', function (data) {
        hRegister.respose(socket, data);
    });
    //-------------------- register
    socket.on('register', function (data) {
        console.log("---------- register ---------------");
        hRegister.register(socket, data, connection);
    });
    //-------------------- login
    socket.on('login', function (data) {
        console.log("----------------- user login --------------");
        hUser.login(socket, data, connection);
    });
    //-------------------- forgot_pass
    socket.on('forgot_pass', function (data) {
        hRegister.request(socket,data, connection);
    });
}