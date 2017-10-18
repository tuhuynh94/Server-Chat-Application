var hConversation = require('../Handlers/hConversation');

exports = module.exports = function (io, socket, connection) {

    socket.on("request_load_conversation", function (data) {
        hConversation.load_conversation(io,socket,data);
    })
}