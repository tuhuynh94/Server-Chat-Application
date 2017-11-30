var db = require('../Models/database');
var mInvitation = require('../Models/mInvitation');
var mFriend = require('../Models/mFriends');
//let query = require('');

var hFriend = (() => {

    //DONE
    let _load_invitation = (socket,lst_online_user) => {
        console.log("========== _load_invitaion =========");
        socket.invitaions = db.invite_friends().filter(f => f.from_phone == socket.phone);
        console.log(socket.invitaions.length);
        socket.join(socket.phone+"-invitaion");

        //add all friend in socket.phone-friend room
        for (var index = 0; index < socket.invitaions.length; index++) {
            var element = socket.invitaions[index];
            var other_socket_id = global.lst_online_user[element.to_phone];
            if (typeof (other_socket_id) != 'undefined') {
                var other_socket = io.sockets.connected[other_socket_id];
                io.sockets.connected[other_socket_id].join(socket.phone+"-invitaion");                
            }
        }
    };

    let _broadcash_all_invitaion = (socket,content,type) => {
        socket.broadcast.to(socket.phone+"-invitaion").emit("broadcast_all_invitation",{
            type:type,
            user:socket.username,
            content:content
        })
    };
  

    return {
        load_invitation:_load_invitation,
        broadcash_all_invitaion:_broadcash_all_invitaion
    };

})();
module.exports = hFriend;