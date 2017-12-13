
let db = require('../Models/database');
let hFriend = require('../Handlers/hFriend');
let hConversation = require('../Handlers/hConversation');
let hInvivation = require('../Handlers/hInvitation');
let fs = require('fs');
var path = require('path');

let hUser = (() => {
    let _connect = (io, socket, data, lst_online_user) => {
        console.log("------------login success connect to node server-------------");

        socket.phone = data["phone"];
        socket.username = data["username"];
        socket.birthday = data["birthday"];
        socket.gender = data["gender"];
        socket.email = data["email"];
        socket.image = data["image_source"];

        console.log("SOCKET.PHONE " + socket.phone + "--------SOCKET.USERNAME " + socket.username + " ");

        let c_socket = lst_online_user[socket.phone];
        if (typeof (c_socket) == 'undefined') {
            lst_online_user[socket.phone] = socket.id;
            console.log(lst_online_user[socket.phone]);
        }

        hInvivation.load_invitation(io, socket, lst_online_user);
        // REVIEW: multi device with a user

    }
    let _before_disconnect = (socket, lst_online_user) => {
        console.log("================before disconnect==================");
        hFriend.broadcash_all_friend(socket, "offline", "offline");
        delete lst_online_user[socket.phone];
    }

    let _update_user_info = (socket, data, lst_online_user) => {
        console.log("update user information");
        socket.username = data["username"];

        hFriend.broadcash_all_friend(socket, data, "update_info_in_friend");
        var a = socket.conversations.length;
        hConversation.broadcash_all_conversation(socket, data, "update_info_in_conversation");
        hInvivation.broadcash_all_invitaion(socket, data, "update_info_in_invitation");
    }

    //NOT USE
    let _login = (socket, data, conn) => {
        console.log("========== login =========");
        let sql = "SELECT `phone`, `username`, `email`, `birthday` FROM `users` WHERE `phone` = '" + data['username'] + "' OR `username` = '" + data['username'] + "' AND `password` = '1' ;";
        conn.query(sql, function (err, rows) {
            if (typeof (rows.length) != "undefined" && rows.length > 0) {
                socket.emit('return_login', {
                    success: true
                    , info: JSON.parse(JSON.stringify(rows))
                });
                socket.username = rows[0].username;
                socket.phone = rows[0].phone;
                hFriend.load_friends(socket);
                console.log(socket.phone + " " + socket.username);
            }
            else {
                socket.emit('return_login', {
                    success: false
                    , info: "this phone is using"
                });
            }
        });
    };
    //NOT USE
    let _updateInfo = (socket, data) => {
        let sql = "UPDATE `users` SET `password` = '" + data["pass"] + "', `password` = '" + data["pass"] + "', `birthday` = '" + data["pass"] + "', `email` = '" + data["pass"] + "' WHERE `phone` = '" + socket.phone + "';";
        conn.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                socket.emit('return_update_user', {
                    success: false
                    , info: err
                });
            } else {
                socket.emit('return_update_user', {
                    success: true
                    , info: JSON.parse(JSON.stringify(rows))
                });
            }
        });
    };

    let _change_image = (socket, data) => {
        var dir = __dirname;
        var upload_path = path.join(__dirname, "../..", "PHPServer/image_user/");
        var day = new Date();
        // fs.exists(upload_path + socket.phone + ".jpg", async function(exists) {
        //     if (exists) {
        //         await fs.unlinkSync(upload_path + socket.phone + ".jpg");
        //         await fs.writeFileSync(upload_path + socket.phone  + ".jpg", data);
        //     }
        //     else{
        //         await fs.writeFileSync(upload_path + socket.phone + ".jpg", data);
        //     }
        //     fs.readFile(upload_path + socket.phone + ".jpg", function(err, res){
        //         if(!err){
        //             socket.emit('change_avatar', {image:res, image_path : socket.phone + ".jpg"});
        //         }
        //         else{
        //             console.log('fail');
        //         }
        //     });
        // });
        var time_stamp = getDateTime();
        fs.writeFileSync(upload_path + socket.phone + "_" + time_stamp + ".jpg", data);
        fs.readFile(upload_path + socket.phone + "_" + time_stamp + ".jpg", function (err, res) {
            if (!err) {
                socket.emit('change_avatar', { image: res, image_path: socket.phone + "_" + time_stamp + ".jpg" });
            }
            else {
                console.log('fail');
            }
        });
    };
    return {
        connect: _connect
        , before_disconnect: _before_disconnect
        , update_user_info: _update_user_info
        , change_avatar: _change_image
        // login:_login,
        // , updateInfo: _updateInfo
    };
})();
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + month + day + hour + min + sec;

}
module.exports = hUser;