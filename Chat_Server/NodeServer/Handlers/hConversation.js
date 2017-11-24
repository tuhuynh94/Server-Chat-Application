let db = require('../Models/database');

let conversation = (() =>{
    //Done
    let _load_conversation =  (socket, data) =>{
        socket.conversations = [];
        let conversation_id = data['conversation_id'].split(',');
        for (let i = 0; i < conversation_id.length; i++) {
            if (conversation_id[i] != '') {
                socket.conversations.push(db.conversations().filter(f => f.conversation_id === conversation_id[i].conversation_id));
                socket.join(conversation_id[i]);
                console.log("Join room " + conversation_id[i]);
            }
        }
    };
    //check
    let _add_conversation =  (io,socket,data, lst_online_user) =>{
       //socket.conversations.push[{conversation_id:data["conversation_id"]}];
        let conversation_id = data["conversation_id"];
        let conversation_name = data["conversation_name"];

       let members = data["member"].split(',');
       for (let index = 0; index < members.length-1; index++) {
           let i_socket = io.socket.connected[lst_online_user[members[index]]];
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

    let _add_member =  (io,socket,data)=> {
        let conversation_id = data["conversation_id"];
        let username = data["username"];
        let other_socket =  io.sockets.connected[data["other_phone"]];

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
    
    let _leave_conversation =  (socket,data)=> {
        let conversation = data["conversation"];
        socket.broadcast.to(data['conversation_id']).emit('chat_message', {
             type:"sys",
             content:socket.username +" has left."
        });
        socket.leave(conversation);
    }
    //F
    let _kick_user =  (socket,data)=> {
        let conversation = data["conversation"];
        socket.broadcast.to(data['conversation_id']).emit('chat_message', {
             type:"sys",
             content:socket.username +" has left."
        });
        socket.leave(conversation);
    }  

    return{
        add_conversation:_add_conversation,
        load_conversation:_load_conversation,
        add_member:_add_member
    }
    
})();
module.exports = conversation
