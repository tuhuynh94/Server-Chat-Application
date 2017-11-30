
var hRegister = require('../Handlers/hRegister');
let hUser = require('../Handlers/hUser');
var fs = require('fs');

exports = module.exports = (io,socket,connection, lst_online_user) =>{
        //-------------------- sent request to get verification code
    socket.on('request', function (data) {
        socket.phone = data["phone"];
        hRegister.request(socket, data,connection);
    });
    //-------------------- sent verification code to verification
    socket.on('response', function (data) {
        hRegister.response(socket, data);
    });
    //-------------------- register
    socket.on('register', function (data) {
        console.log("---------- register ---------------");
        hRegister.register(socket, data, connection);
    });
    //-------------------- login
    socket.on('login', function (data) {
        console.log("----------------- user login --------------");        
        hUser.connect(socket, data, connection);
    });
    //-------------------- forgot_pass
    socket.on('forgot_pass', function (data) {
        hRegister.request(socket,data, connection);
    });
    //-------------------- update_user_info
    socket.on('update_user', function (data) {
        hUser.update_user_info(io,socket,data);
    });
    //-------------------- change avatar------------------------------------
    socket.on("change_avatar", function(data){
        hUser.change_avatar(socket, data);
    });
}