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

var lst_online_user = {};

io.on('connection',function(socket){
    socket.on('disconnect', function () {
        console(socket.phone +" IS DISCONNECT." )
    });
    socket.on('before_disconnect', function () {
        hUser.before_disconnect(socket, lst_online_user);
    })

    var friends = require('./Listener/lis_Friend')(io,socket,connection, lst_online_user);
    var user = require('./Listener/lis_User')(io, socket, connection, lst_online_user);
    var conversation = require('./Listener/lis_Conversation')(io, socket, connection, lst_online_user);
    var chat = require('./Listener/lis_Chat')(io, socket, connection, lst_online_user);
});
