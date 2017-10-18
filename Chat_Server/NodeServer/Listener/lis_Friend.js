

var hFriend = require('../Handlers/hFriend');

exports = module.exports = function(io,socket,connection){
     //-------------------- request_load_friend
    socket.on('request_load_friend', function () {
        hFriend.load_friends(socket);
    });
   //-------------------- request_add_friend
    socket.on('request_add_friend', function (data) {
        hFriend.request_add_friend(io, socket, data, connection);
    });
    //-------------------- response_add_friend
    socket.on('response_add_friend', function (data) {
        hFriend.response_add_friend(io, socket, data);
    });
    // //-------------------- unfriend
    // socket.on('un_friend', function (data) {
    //     hFriend.inform_unfriend(io, socket, data);
    // });
    //--------------------recive unfriend
    socket.on('unfriend', function (data) {
        hFriend._unfriend(io, socket, data);
    });
}