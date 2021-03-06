let db = require('../Models/database');
var hFriend = require('../Handlers/hFriend');

let conversation = (() => {
    //Done
    let _load_conversation = (socket, data) => {
        socket.conversations = [];
        let conversation_id = data['conversation_id'].split(',');
        console.log(conversation_id);

        for (let i = 0; i < conversation_id.length; i++) {
            if (conversation_id[i] != '') {
                let con = db.conversations().find(f => f.conversation_id == conversation_id[i]);
                socket.conversations.push(con);
                socket.join(conversation_id[i]);
                console.log("Join room " + conversation_id[i]);
            }
        }
    };
    let _broadcash_all_conversation = (socket, content, type) => {
        console.log(type + " --- broadcash to all conversations ---");
        console.log("conversation lenght " + socket.conversations.length);
        for(let i = 0; i<socket.conversations.length;i++) {
            let element = socket.conversations[i];
            console.log(element);
            console.log("emit to conversation " + element.conversation_id);
            socket.broadcast.to(element.conversation_id).emit("broadcast_all_conversation",{
                conversation_id:element.conversation_id,
                phone:socket.phone,
                content:content,
                type:type
            });
        }
    }
    //check
    let _add_conversation = (io, socket, data, lst_online_user) => {
        //socket.conversations.push[{conversation_id:data["conversation_id"]}];
        let conversation_id = data["conversation_id"];
        let conversation_name = data["conversation_name"];

        // socket.conversations.push({conversation_id:conversation_id, conversation_name:conversation_name});

        let members = data["members"].split(',');
        for (let index = 0; index < members.length - 1; index++) {
            let i_socket = io.sockets.connected[lst_online_user[members[index]]];
            if (typeof (i_socket) != 'undefined') {
                i_socket.join(conversation_id);
                i_socket.conversations.push({
                    conversation_id: conversation_id,
                    conversation_name: conversation_name
                }); // add new conversation to socket
                var friend_socket = lst_online_user[members[index]];
                if(typeof(friend_socket) != 'undefined'){
                    hFriend.broadcash_all_friend(i_socket, "online", "online")
                }
                i_socket.emit("r_add_conversation", {
                    conversation_id: conversation_id,
                    owner: socket.username,
                    conversation_name: conversation_name
                });
            }
        }
    }

    let _add_member = (io, socket, data, lst_online_user) => {
        let conversation_id = data["conversation_id"];
        let username = data["username"];
        let other_socket_id = lst_online_user[data["other_phone"]];

        if (other_socket_id != null && typeof (other_socket_id) != 'undefined') {
            var other_socket = io.sockets.connected[other_socket_id];
            other_socket.join(conversation_id);
            other_socket.emit('r_add_new_mem', {
                type: "sys",
                content: "add new member to conversation",
                user_add: socket.username,
                user_join: username,
                conversation_id: conversation_id
            });
        }
    }
    let _leave_conversation = (io, socket, data, lst_online_user) => {
        let conversation = data["conversation_id"];
        let other_socket_id = lst_online_user[data["phone"]];
        let other_username = data["username"];

        if (other_socket_id != null && typeof (other_socket_id) != 'undefined') {
            let other_socket = io.sockets.connected[other_socket_id];
            other_socket.emit('r_leave_conversation', {
                check: true,
                username: socket.username
            });
            other_socket.leave(conversation);
        }
        io.to(conversation).emit("r_leave_conversation", {
            check: false,
            username: socket.username,
            user_kicked: other_username
        });
    }

    return {
        add_conversation: _add_conversation,
        load_conversation: _load_conversation,
        add_member: _add_member,
        leave_conversation: _leave_conversation,
        broadcash_all_conversation:_broadcash_all_conversation
    }

})();
module.exports = conversation