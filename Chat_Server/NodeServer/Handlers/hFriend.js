var db = require('../Models/database');
//var query = require('');

var hFriend = (function () {

    var _load_friends = function (socket) {
        console.log("========== _load_friends =========");
        socket.friends = db.friends().filter(f => f.phone == socket.phone || f.friend_phone == socket.phone);
        console.log(socket.friends.length);
    };

    var _request_add_friend = function (io, socket, data, conn) {
        console.log("========== _response_add_friend =========");
        var sentTo = data['other_phone'];
        var otherSocket = io.sockets.sockets[sentTo];
        //var other_phone = query.FindInfor(other);

        if (typeof (otherSocket) == 'undefined') {
            var sql = "INSERT INTO `invite_friend` (`from_phone`, `to_phone`, `invited_at`) VALUES ('" + socket.phone + "', '" + other_phone + "', '');";
            conn.query(sql, function (err, rows) {
                console.log("catch----: " + err);
            });
        } else {
            io.sockets.connected[otherSocket].emit('return_invite_friend', {
                from: socket.phone,
                from_username: socket.username,
                birthday: socket.birthday,
                to: sentTo,
            });
        }
    };

    var _response_add_friend = function (io, socket, data) {
        console.log("========== _response_add_friend =========");
        var from = data['other_phone'];
        var otherSocket = io.sockets.sockets[from];
        if (data['is_accept']) {
            io.sockets.connected[otherSocket].emit('return_response_invite_friend', {
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
            io.sockets.connected[otherSocket].emit('return_response_invite_friend', {
                is_accept: false,
                from: socket.phone,
                from_username: socket.username,
                birthday: socket.birthday,
                to: sentTo,
            });
        }
    };

    var _update_add_friend = function (socket, data) {
         socket.friends.push({
                email: data["email"],
                birthday: data["birthday"],
                username: data["username"],
                add_at: data["add_at"],
                phone: socket.phone,
                friend_phone: data["other_phone"]
            });
    }

    var _unfriend = function (socket, data) {
        console.log("========= recieve ========")
        var flat = data["flat"];
        var other_phone = data["other_phone"];

        var otherSocket = io.sockets.sockets[other_phone];

        if (flat) {
            io.sockets.connected[otherSocket].emit('unfriend', {
                friend_phone: socket.phone,
                friend_name: socket.username,
                flat: false
            })
        }

        var index = socket.friends.indexOf(f => f.phone == socket.phone || f.friend_phone == other_phone);
        socket.friends.splice(index, 1);
    }

    return {
        load_friends: _load_friends,
        request_add_friend: _request_add_friend
        ,response_add_friend: _response_add_friend
        ,unfriend: _unfriend
    };

})();
module.exports = hFriend;