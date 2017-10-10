var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
server.listen(3000, "0.0.0.0");

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat',
    charset: 'utf8_general_ci'
});

var db = require('./Models/database');
var hClient = require('./Handlers/hClient');
var hUser = require('./Handlers/hUser');
var hRegister = require('./Handlers/hRegister');

setTimeout(function(){
    console.log("all users ----"+ db.users().length);
    console.log("all conversations ----"+ db.conversations().length);
    console.log("all friends ----"+ db.friends().length);
    console.log("all invite_friends ----"+ db.invite_friends().length);
    console.log("all message_seen ----"+ db.message_seen().length);
    console.log("all messages ----"+ db.messages().length);
},1000);

io.on('connection',function(socket){
    //console.log(socket.client.conn.id + ", ip : " + socket.handshake.address);
    console.log(">>>>>>>>>> Join <<<<<<<<<");

    socket.on('connect_to_server', function (data) {        
        console.log("connected devices");
        hClient.connect(socket,data);
    });

    socket.on('disconnect', function (data) {
        console.log("disconnect devices");
        hClient.disconnect(socket,data);
    });
``
//-------------------- sent request to get verification code
    socket.on('request', function (data) {
        socket.phone = data["phone"];
        hRegister.retry(socket, data);
    });
//-------------------- sent verification code to verification
    socket.on('respose', function (data) {
        hRegister.respose(socket, data);
    });
//-------------------- add to database
    socket.on('register', function (data) {
        console.log("---------- register ---------------");
        hUser.register(socket, data, connection);
    });
//-------------------- login
    socket.on('login', function (data) {
        console.log("----------------- user login --------------");
        hUser.login(socket, data, connection);
    });
//-------------------- forgot_pass
    socket.on('forgot_pass', function (data) {
        hRegister.request(socket,data);
    });
});
