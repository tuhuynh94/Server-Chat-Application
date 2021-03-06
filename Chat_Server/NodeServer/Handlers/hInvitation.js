var db = require('../Models/database');
var mInvitation = require('../Models/mInvitation');
var mFriend = require('../Models/mFriends');
//let query = require('');

var hFriend = (() => {

    //DONE
    let _load_invitation = (io,socket,lst_online_user) => {
        console.log("========== _load_invitaion =========");
        //load all invitation
        socket.invitaions = db.invite_friends().filter(f => f.to_phone == socket.phone);
        console.log(socket.invitaions.length);
        socket.join(socket.phone+"-invitaion");

        //add all friend in socket.phone-friend room
        for (var index = 0; index < socket.invitaions.length; index++) {
            var element = socket.invitaions[index];
            var other_socket_id = lst_online_user[element.from_phone];
            if (typeof (other_socket_id) != 'undefined') {
                //join to sender socket room
                var other_socket = io.sockets.connected[other_socket_id];
                socket.join(other_socket.phone+"-invitaion");                
            }
        }
    };

    let _broadcash_all_invitaion = (socket,content,type) => {
        console.log(type + "--- broadcash to all invitaion ---");
        socket.broadcast.to(socket.phone+"-invitaion").emit("broadcast_all_invitation",{
            type:type,
            phone: socket.phone,
            username:socket.username,
            content:content
        })
    };
  

    return {
        load_invitation:_load_invitation,
        broadcash_all_invitaion:_broadcash_all_invitaion
    };

})();
module.exports = hFriend;