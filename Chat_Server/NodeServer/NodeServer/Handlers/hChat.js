
var hChat = (function () {

    var _send_msg = function (io, socket, data) {
        console.log("========== send message =========");
        io.sockets.connected[data.name].emit('send_msg', {content: data.content, client_id: socket.id});     
    };

    var _edit_msg = function (socket, data) {
        console.log("========== edit message =========");

    };

    var _send_group_msg = (socket, data) => {
        console.log("========== send group message =========");
        io.sockets.in(socket.room).emit("send_group_msg", {content : data.content, client_id: socket.id})
    }

    return{
        send_msg: _send_msg,
        send_group_msg : _send_group_msg,
        edit_msg: _edit_msg
    };
    
})();
module.exports = hChat;