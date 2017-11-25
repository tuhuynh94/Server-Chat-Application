
let db = require('../Models/database');
 
let hUser = (() =>{
    let _connect = (socket,data,lst_online_user)=>{        
        console.log("------------login success connect to node server-------------");
        socket.phone = data["phone"];
        socket.username = data["username"];
        socket.birthday = data["birthday"];
        console.log("SOCKET.PHONE "+ socket.phone + "--------SOCKET.USERNAME " + socket.username + " ");     

        //console.log("========== _load_friends =========");
        //socket.friends = db.friends().filter(f => f.phone == socket.phone || f.friend_phone == socket.phone);
        //console.log(socket.friends.length);

        //socket.conversations = [];
        //let conversation_id = data['conversation_id'].split(',');
        //for (let i = 0; i < conversation_id.length; i++) {
        //    if (conversation_id[i] != '') {
        //        socket.conversations.push(db.conversations().filter(f => f.conversation_id === conversation_id[i].conversation_id));
        //        socket.join(conversation_id[i]);
        //        console.log("Join room " + conversation_id[i]);
        //    }
        //}           

        let c_socket = lst_online_user[socket.phone];
        if ( typeof(c_socket) == 'undefined') {
            lst_online_user[socket.phone] = socket.id;    
            //TODO: broacash to all friend to update status after friend update
        }       
        // REVIEW: multi device with a user
        
    }
    let _before_disconnect = (socket,data,lst_online_user)=>{        
        console.log("================disconnect==================");
        delete lst_online_user[socket.phone];
    }


    // let _login =  (socket, data,conn) {
    //     console.log("========== login =========");
    //     let sql = "SELECT `phone`, `username`, `email`, `birthday` FROM `users` WHERE `phone` = '"+data['username']+"' OR `username` = '"+ data['username']+"' AND `password` = '1' ;";
    //     conn.query(sql,  (err, rows) {
    //         if (typeof (rows.length) != "undefined" && rows.length >0) {
    //             socket.emit('return_login',{
    //                 success: true
    //                 ,info:JSON.parse(JSON.stringify(rows))
    //             });
    //             socket.username = rows[0].username;
    //             socket.phone = rows[0].phone;
    //             hFriend.load_friends(socket);
    //             console.log(socket.phone + " " + socket.username);
    //         }
    //         else{
    //             socket.emit('return_login',{
    //                 success: false
    //                 ,info:"this phone is using"
    //             }); 
    //         }
    //     });
    // };

    // let _updateInfo =  (socket, data) {
    //     let sql = "UPDATE `users` SET `password` = '"+data["pass"]+"', `password` = '"+data["pass"]+"', `birthday` = '"+data["pass"]+"', `email` = '"+data["pass"]+"' WHERE `phone` = '"+socket.phone+"';";
    //        conn.query(sql, (err,rows){
    //            if (err) {
    //                 console.log(err);
    //                 socket.emit('return_update_user',{
    //                     success: false
    //                     ,info:err
    //                 });
    //            } else {
    //                 socket.emit('return_update_user',{
    //                      success: true
    //                     ,info:JSON.parse(JSON.stringify(rows))
    //                 });
    //            }                           
    //        });
    // };   

    return{
        connect:_connect
        , before_disconnect: _before_disconnect
        // login:_login,
        // , updateInfo: _updateInfo
    };
})();

module.exports = hUser;