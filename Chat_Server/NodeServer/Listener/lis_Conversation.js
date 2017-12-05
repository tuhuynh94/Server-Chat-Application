var hConversation = require('../Handlers/hConversation');

exports = module.exports = (io, socket, connection, lst_online_user)=> {
    

    socket.on("add_new_conversation", function (data) {
        // add new member in conversation
        hConversation.add_conversation(io,socket,data,lst_online_user);
    })
    socket.on("request_load_conversation", function (data) {
        console.log(lst_online_user);
        hConversation.load_conversation(socket,data);
    });
    socket.on("add_new_mem", function (data) {
        // add new member in conversation
        hConversation.add_member(io,socket,data,lst_online_user);
    })
    socket.on("leave_conversation",function (data) {
        hConversation.leave_conversation(io,socket,data.lst_online_user);
    })
}