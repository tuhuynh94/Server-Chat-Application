var db = require('../Models/database');

var conversation = (function () {
    var _load_conversation = function (io,socket, data) {
        socket.conversations = [];
        var conversation_id = data['conversation_id'].split(',');
        for (var i = 0; i < conversation_id.length; i++) {
            if (conversation_id[i] != '') {
                socket.conversations.push(db.conversations().filter(f => f.conversation_id === conversation_id[i].conversation_id));
                socket.join(conversation_id[i]);
                console.log("Join room " + conversation_id[i]);
            }
        }
    }

    var _leave_conversation = function (socket,data) {
        var conversation = data["conversation"];
        socket.broadcast.to(data['conversation_id']).emit('chat_message', {
             type:"sys",
             content:socket.username +" has left."
        });
        socket.leave(conversation);
    }
    
    var _kick_user = function (socket,data) {
        var conversation = data["conversation"];
        socket.broadcast.to(data['conversation_id']).emit('chat_message', {
             type:"sys",
             content:socket.username +" has left."
        });
        socket.leave(conversation);
    }

    var _add_conversation = function () {
        
    }
    return{
        load_conversation:_load_conversation
    }
    
})();
module.exports = conversation
