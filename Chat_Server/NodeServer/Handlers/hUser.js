
let db = require('../Models/database');
let hFriend = require('../Handlers/hFriend');
let hConversation = require('../Handlers/hConversation');
let hInvivation = require('../Handlers/hInvitation');
let fs = require('fs');
var path = "C:\\Users\\gardo\\Desktop\\Server-Chat-Application\\Chat_Server\\PHPServer\\image_user\\";
 
let hUser = (() =>{
    let _connect = (io,socket,data,lst_online_user)=>{        
        console.log("------------login success connect to node server-------------");
        
        socket.phone = data["phone"];
        socket.username = data["username"];
        socket.birthday = data["birthday"];
        socket.gender = data["gender"];
        socket.email = data["email"];
        socket.image = data["image_source"];


        console.log("SOCKET.PHONE "+ socket.phone + "--------SOCKET.USERNAME " + socket.username + " ");       

        let c_socket = lst_online_user[socket.phone];
        if ( typeof(c_socket) == 'undefined') {
            lst_online_user[socket.phone] = socket.id;   
            console.log(lst_online_user[socket.phone]); 
        }       

        hInvivation.load_invitation(io,socket,lst_online_user);
        // REVIEW: multi device with a user
        
    }
    let _before_disconnect = (socket, lst_online_user)=>{        
        console.log("================before disconnect==================");
        hFriend.broadcash_all_friend(socket,"offline","offline");
        delete lst_online_user[socket.phone];
    }

    let _update_user_info = (socket,data,lst_online_user)=>{
        console.log("update user information");
        socket.username= data["username"];
        hFriend.broadcash_all_friend(socket,data,"update_info_friend");
        hConversation.broadcash_to_all_conversation(socket,data,"update_info_conversation");
        hInvivation.broadcash_all_invitaion(socket,data,"update_info_invitation");

    }

    //NOT USE
    let _login =  (socket, data,conn)=>{
        console.log("========== login =========");
        let sql = "SELECT `phone`, `username`, `email`, `birthday` FROM `users` WHERE `phone` = '"+data['username']+"' OR `username` = '"+ data['username']+"' AND `password` = '1' ;";
        conn.query(sql, function (err, rows) {
            if (typeof (rows.length) != "undefined" && rows.length >0) {
                socket.emit('return_login',{
                    success: true
                    ,info:JSON.parse(JSON.stringify(rows))
                });
                socket.username = rows[0].username;
                socket.phone = rows[0].phone;
                hFriend.load_friends(socket);
                console.log(socket.phone + " " + socket.username);
            }
            else{
                socket.emit('return_login',{
                    success: false
                    ,info:"this phone is using"
                }); 
            }
        });
    };
    //NOT USE
    let _updateInfo =  (socket, data) => {
        let sql = "UPDATE `users` SET `password` = '"+data["pass"]+"', `password` = '"+data["pass"]+"', `birthday` = '"+data["pass"]+"', `email` = '"+data["pass"]+"' WHERE `phone` = '"+socket.phone+"';";
           conn.query(sql, function(err,rows){
               if (err) {
                    console.log(err);
                    socket.emit('return_update_user',{
                        success: false
                        ,info:err
                    });
               } else {
                    socket.emit('return_update_user',{
                         success: true
                        ,info:JSON.parse(JSON.stringify(rows))
                    });
               }                           
           });
    };   

    let _change_image = (socket, data) => {
        fs.exists(path + "test.jpg", async function(exists) {
            if (exists) {
                fs.unlinkSync(path + "test.jpg");
                await fs.writeFileSync(path + "test.jpg", data);
            }
            else{
                await fs.writeFileSync(path + "test.jpg", data);
            }
            fs.readFile(path + "test.jpg", function(err, res){
                if(!err){
                    socket.emit('change_avatar', {image:res});
                }
                else{
                    console.log('fail');
                }
            });
        });
    };
    return{
        connect:_connect
        , before_disconnect: _before_disconnect
        , update_user_info:_update_user_info
        , change_avatar: _change_image
        // login:_login,
        // , updateInfo: _updateInfo
    };
})();

module.exports = hUser;