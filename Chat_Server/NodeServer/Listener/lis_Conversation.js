var hConversation = require('../Handlers/hConversation');

exports = module.exports = function (io, socket, connection) {

    socket.on("add_new_conversation", function (data) {
        // add new member in conversation
        hConversation.add_conversation(io,socket,data);
    })
    socket.on("request_load_conversation", function (data) {
        hConversation.load_conversation(io,socket,data);
    });
    socket.on("add_new_mem", function (data) {
        // add new member in conversation
        hConversation.add_member(io,socket,data);
    })
}