let db = require('../Models/database');
let mInvitation = require('../Models/mInvitation');
//let query = require('');

let hFriend = (()=> {

    //DONE
    let _load_friends =  (socket)=> {
        console.log("========== _load_friends =========");
        socket.friends = db.friends().filter(f => f.phone == socket.phone || f.friend_phone == socket.phone);
        console.log(socket.friends.length);

    };

    //check
    let _request_add_friend =  (io, socket, data, conn, lst_online_user)=> {
        console.log("========== _response_add_friend =========");
        let sentTo = data['other_phone'];
        let other_socket_id = lst_online_user[sentTo];
        let otherSocket = null;

        if (other_socket_id != null && typeof (other_socket_id) != 'undefined') {
            otherSocket = io.sockets.sockets[other_socket_id];
            io.sockets.connected[otherSocket].emit('invite_friend', {
                from: socket.phone,
                from_username: socket.username,
            });

        } else {    
            //await mInvitation.add_invitation(conn,socket.phone,socket.username,sentTo);
            mInvitation.add_invitation(conn,socket.phone,socket.username,sentTo);
        }
    };
    //check
    let _response_add_friend =  (io, socket, data, lst_online_user,conn)=> {
        console.log("========== _response_add_friend =========");
        let from = data['other_phone'];
        let other_socket_id = lst_online_user[lst_online_user];
        let is_accept = data['is_accept'];
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
                socket.friends.push({
                    email: data["email"],
                    birthday: data["birthday"],
                    username: data["username"],
                    add_at: data["add_at"],
                    phone: socket.phone,
                    friend_phone: from
                });
            } else {
                otherSocket.emit('return_response_invite_friend', {
                    is_accept: false
                });
            }
        } else {//offline save in database
            // await mInvitation.update_invitation(conn,from.socket.phone,is_accept?1:0);
            mInvitation.update_invitation(conn,from.socket.phone,is_accept?1:0);
        }

    };
    //check
    let _update_add_friend =  (socket, data)=> {
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
    let _unfriend =  (io,socket, data,lst_online_user)=> {
        console.log("========= recieve ========")
        let flat = data["flat"];
        let other_phone = data["other_phone"];

        let other_socket_id = lst_online_user[other_phone];
        if (other_socket_id != null && typeof(other_socket_id)!= 'undefined') {            
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
        request_add_friend: _request_add_friend,
        response_add_friend: _response_add_friend,
        update_add_friend:_update_add_friend,
        unfriend: _unfriend
    };

})();
module.exports = hFriend;
