var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
server.listen(3000, "0.0.0.0");
// var io = require('socket.io')({
//     transports: ['websocket']
// });
var fs = require('fs');

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
var mListUser = require('./Models/mListUser');
setTimeout(function(){
    console.log("all users ----"+ db.users().length);
    console.log("all conversations ----"+ db.conversations().length);
    console.log("all friends ----"+ db.friends().length);
    console.log("all invite_friends ----"+ db.invite_friends().length);
    console.log("all message_seen ----"+ db.message_seen().length);
    console.log("all messages ----"+ db.messages().length);
},1000);

io.on('connection',function(socket){
    socket.on('disconnect', function () {
        console.log("--------------------"+socket.phone +" IS DISCONNECT." );
    });
    socket.on('before_disconnect', function () {
        hUser.before_disconnect(socket, mListUser.get_lst_user_online);
    })

    var friends = require('./Listener/lis_Friend')(io,socket,connection, mListUser.get_lst_user_online);
    var user = require('./Listener/lis_User')(io, socket, connection, mListUser.get_lst_user_online);
    var conversation = require('./Listener/lis_Conversation')(io, socket, connection, mListUser.get_lst_user_online);
    var chat = require('./Listener/lis_Chat')(io, socket, connection, mListUser.get_lst_user_online);
});
// io.attach(3000);
// console.log("Listening port 3000");