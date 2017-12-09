var db = require('../Models/database');
var mInvitation = require('../Models/mInvitation');
var mFriend = require('../Models/mFriends');
//let query = require('');

var hFriend = (() => {

    //DONE
    let _load_friends = (io,socket,lst_online_user) => {
        console.log("========== _load_friends =========");
        socket.friends = db.friends().filter(f => f.phone == socket.phone);
        console.log(socket.friends.length);
        socket.join(socket.phone+"-friend");

        //add all friend in socket.phone-friend room
        for (var index = 0; index < socket.friends.length; index++) {
            var element = socket.friends[index];
            var other_socket_id = lst_online_user[element.friend_phone];
            if (typeof (other_socket_id) != 'undefined') {
                var other_socket = io.sockets.connected[other_socket_id];
                other_socket.join(socket.phone+"-friend");                
            }
        }
        //broadcash infomation to all friend (socket,content, type);
        _broadcash_all_friend(socket,"online","online");
    };

    let _broadcash_all_friend = (socket,content,type) => {
        socket.broadcast.to(socket.phone+"-friend").emit("broadcast_all_friend",{
            type:type,
            user:socket.username,
            content:content
        })
    };
    //check
    let _invite_friend = async (io, socket, data, conn, lst_online_user) => {
        console.log("========== invite_friend =========");
        let sentTo = data['other_phone'];
        let other_socket_id = lst_online_user[sentTo];
        let otherSocket = null;
        if (other_socket_id != null && typeof (other_socket_id) != 'undefined') {
            otherSocket = io.sockets.sockets[other_socket_id];
            await mInvitation.add_invitation(conn, socket,sentTo);
            otherSocket.emit('invite_friend', {
                from: socket.phone,
                from_username: socket.username,
            });
            //thêm vào danh sách invite client
        } else {
            //await mInvitation.add_invitation(conn,socket.phone,socket.username,sentTo);
            mInvitation.add_invitation(conn, socket,sentTo);
        }
    };
    //check
    let _response_add_friend = async (io, socket, data, lst_online_user, conn) => {
        console.log("========== _response_add_friend =========");
        let from = data['other_phone'];      
        
        let other_socket_id = lst_online_user[lst_online_user];
        let is_accept = data['is_accept'];

        let friend = await mFriend.add_friend(conn, socket.phone,from);

        console.log(friend);

        //online
        if (other_socket_id != null && typeof (other_socket_id) != 'undefined') {
            let otherSocket = io.sockets.connected[other_socket_id];
            if (is_accept) {
                otherSocket.emit('return_response_invite_friend', {
                    is_accept: true,
                    from: socket.phone,
                    from_username: socket.username,
                    birthday: socket.birthday,
                    to: sentTo,
                });
                otherSocket.friends.push({
                    email: socket.email,birthday: socket.birthday,username: socket.username,
                    add_at: friend.add_at,phone: otherSocket.phone, friend_phone: socket.phone,
                    gender:socket.gender
                });
                socket.friends.push({
                    email: friend.email,birthday: friend.birthday
                    ,username: friend.username,phone: socket.phone,friend_phone: from,
                    gender:otherSocket.gender
                });

                otherSocket.join(socket.phone+"-friend");
                socket.join(otherSocket);               

            } else {
                otherSocket.emit('return_response_invite_friend', {
                    is_accept: false
                });                
            }
        } else { //offline save, del in database            
            if (is_accept) {
                mFriend.add_friend(conn, from,socket.phone);
            }
        }   
        socket.emit("answered_invitation",{from:from,}); //TODO
        mInvitation.del_invitation(conn, from,socket.phone);     
    };
    //check
    let _update_add_friend = (socket, data) => {
        socket.friends.push({
            email: data["email"],
            birthday: data["birthday"],
            username: data["username"],
            add_at: data["add_at"],
            phone: socket.phone,
            friend_phone: data["other_phone"]
        });
    }
    //check
    let _unfriend = (io, socket, data, lst_online_user) => {
        console.log("========= recieve ========")
        let flat = data["flat"];
        let other_phone = data["other_phone"];

        let other_socket_id = lst_online_user[other_phone];
        if (other_socket_id != null && typeof (other_socket_id) != 'undefined') {
            if (flat) {
                io.sockets.connected[otherSocket].emit('un_friend', {
                    friend_phone: socket.phone,
                    friend_name: socket.username
                });
            }
        } else {
            //NO IDEAL
        }
        let index = socket.friends.indexOf(f => f.phone == socket.phone || f.friend_phone == other_phone);
        socket.friends.splice(index, 1);
    }

    return {
        load_friends: _load_friends,
        invite_friend: _invite_friend,
        response_add_friend: _response_add_friend,
        update_add_friend: _update_add_friend,
        unfriend: _unfriend,
        broadcash_all_friend:_broadcash_all_friend,
    };

})();
module.exports = hFriend;