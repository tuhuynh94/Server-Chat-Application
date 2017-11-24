
let hChat = (() =>{

    let _send_msg =  (io, socket, data)=> {
        console.log("========== send message =========");
        // io.sockets.connected[data.name].emit('send_msg', {content: data.content, client_id: socket.id});                
        io.to(data['conversation_id']).emit('receive_message', {
             type:"chat",
             content:data["msg"], 
             creator:socket.phone,
             created_at: data["create_at"],
             conversation_id: data['conversation_id']
        });
        console.log(
            "conversation_id: " + data['conversation_id'] + " content:" + data["msg"] + " ,creator:" + socket.phone + " ,created_at: " + data["create_at"]
        );
    };

    let _edit_msg =  (socket, data)=> {
        console.log("========== edit message =========");

    };
    let _del_msg =  (socket, data) =>{
        console.log("========== edit message =========");

    };

    let _send_group_msg = (socket, data) => {
        console.log("========== send group message =========");
        io.sockets.in(socket.room).emit("send_group_msg", {content : data.content, client_id: socket.id})
    }

    return{
        send_msg: _send_msg,
        send_group_msg : _send_group_msg,
        edit_msg: _edit_msg,
        del_msg:_del_msg
    };
    
})();
module.exports = hChat;