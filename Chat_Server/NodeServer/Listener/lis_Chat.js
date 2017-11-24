

var hChat = require('../Handlers/hChat');

exports = module.exports = (io,socket,connection, lst_online_user)=>{
     //-------------------- send_msg
    socket.on('send_msg', function (data) {
        hChat.send_msg(io,socket,data);
    });
   //-------------------- edit_msg
    socket.on('edit_msg', function (data) {
        hChat.edit_msg(io, socket, data);
    });
    //-------------------- del_msg
    socket.on('del_msg', function (data) {
        hChat.del_msg(io, socket, data);
    });
}