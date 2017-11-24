

var hFriend = require('../Handlers/hFriend');

exports = module.exports = (io,socket,connection,lst_online_user)=>{
     //-------------------- request_load_friend
    socket.on('request_load_friend', function () {
        hFriend.load_friends(socket);
    });
   //-------------------- request_add_friend
    socket.on('request_add_friend', function (data) {
        hFriend.request_add_friend(io, socket, data, connection,lst_online_user);
    });
    //-------------------- response_add_friend
    socket.on('response_add_friend', function (data) {
        hFriend.response_add_friend(io, socket, data,lst_online_user,connection);
    });
 //-------------------- response_add_friend
    socket.on('update_add_friend', function (data) {
        hFriend.update_add_friend(socket, data);
    });
    
    //-------------------- unfriend
    socket.on('un_friend', function (data) {
        hFriend.unfriend(io, socket, data,lst_online_user);
    });
}