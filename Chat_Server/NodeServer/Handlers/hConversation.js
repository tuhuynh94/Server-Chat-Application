var db = require('../Models/database');

var conversation = (function () {
    var _load_conversation = function (io,socket, data) {
        socket.conversations = [];
        socket.message = {};
        var tmp = null;
        var conversation_id = data['conversation_id'].split(',');
        console.log("========== _load_conversation =========");
        for (var k in conversation_id) {
            if (conversation_id[k]!="") {
                tmp = db.conversations().find(i => i.conversation_id == conversation_id[k]);
            }
            if (typeof tmp != 'undefined' && tmp != null) {
                socket.conversations.push(tmp);
                socket.message[tmp.conversation_id] = [];
                socket.join(tmp.conversation_id);
                tmp = null;
            }
    }

        console.log(socket.conversations);
        console.log(io.sockets.adapter.rooms);
    }
    var _add_conversation = function (socket, data) {

    }

    return{
        load_conversation:_load_conversation
    }
    
})();
module.exports = conversation;