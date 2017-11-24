var db = require('../Models/database');

var conversation = (function () {
    //Done
    var _load_conversation = function (socket, data) {
        socket.conversations = [];
        var conversation_id = data['conversation_id'].split(',');
        for (var i = 0; i < conversation_id.length; i++) {
            if (conversation_id[i] != '') {
                socket.conversations.push(db.conversations().filter(f => f.conversation_id === conversation_id[i].conversation_id));
                socket.join(conversation_id[i]);
                console.log("Join room " + conversation_id[i]);
            }
        }
    };

    var _add_member = function (io,socket,data) {
        var conversation_id = data["conversation_id"];
        var username = data["username"];
        var other_socket =  io.sockets.connected[data["other_phone"]];

       other_socket.join(conversation_id);
        socket.broadcast.to(data['conversation_id']).emit('return_add_new_mem', {
             type:"sys",
             content:"add new member to conversation",
             user_add: socket.username,
             user_join: username,
             conversation_id:conversation_id
        });
        // io.sockets.connected[otherSocket].emit('confirm_add_new_mem', {
        //         from: socket.phone,
        //         from_username: socket.username,
        //         birthday: socket.birthday,
        //         to: sentTo,
        // });
    }
    
    var _leave_conversation = function (socket,data) {
        var conversation = data["conversation"];
        socket.broadcast.to(data['conversation_id']).emit('chat_message', {
             type:"sys",
             content:socket.username +" has left."
        });
        socket.leave(conversation);
    }
    //F
    var _kick_user = function (socket,data) {
        var conversation = data["conversation"];
        socket.broadcast.to(data['conversation_id']).emit('chat_message', {
             type:"sys",
             content:socket.username +" has left."
        });
        socket.leave(conversation);
    }
    //check
    var _add_conversation = function (io,socket,data) {
       //socket.conversations.push[{conversation_id:data["conversation_id"]}];
        var conversation_id = data["conversation_id"];
        var conversation_name = data["conversation_name"];

       var members = data["member"].split(',');
       for (var index = 0; index < members.length-1; index++) {
           var i_socket = io.socket.connected[members[i]];
           if (i_socket != null && typeof(i_socket) != 'undefined') {
               i_socket.join(conversation_id);
               i_socket.conversations.push({conversation_id:conversation_id, conversation_name:conversation_name}); // add new conversation to socket
               i_socket.emit("r_add_conversation",{
                   conversation_id:conversation_id 
                   ,owner:socket.username
                   ,conversation_name:conversation_name
                });
           }
       }
    }

    return{
        add_conversation:_add_conversation,
        load_conversation:_load_conversation,
        add_member:_add_member
    }
    
})();
module.exports = conversation
