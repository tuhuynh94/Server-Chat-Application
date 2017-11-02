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
var hUser = require('./Handlers/hUser');
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
        hUser.connect(socket,data);
    });
    var friends = require('./Listener/lis_Friend')(io,socket,connection);
    var user = require('./Listener/lis_User')(io, socket, connection);
    var conversation = require('./Listener/lis_Conversation')(io, socket, connection);
    var conversation = require('./Listener/lis_Chat')(io, socket, connection);
});
