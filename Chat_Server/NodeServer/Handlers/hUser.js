var hFriend = require('./hFriend');
var db = require('../Models/database');
 
var hUser = (function () {
     console.log("================hUser==================")
    var _connect = function(socket,data){
        socket.phone = data["phone"];
        socket.username = data["username"];
        socket.birthday = data["birthday"];
    }

    // var _login = function (socket, data,conn) {
    //     console.log("========== login =========");
    //     var sql = "SELECT `phone`, `username`, `email`, `birthday` FROM `users` WHERE `phone` = '"+data['username']+"' OR `username` = '"+ data['username']+"' AND `password` = '1' ;";
    //     conn.query(sql, function (err, rows) {
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

    // var _updateInfo = function (socket, data) {
    //     var sql = "UPDATE `users` SET `password` = '"+data["pass"]+"', `password` = '"+data["pass"]+"', `birthday` = '"+data["pass"]+"', `email` = '"+data["pass"]+"' WHERE `phone` = '"+socket.phone+"';";
    //        conn.query(sql, function(err,rows){
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
        // login:_login,
        // , updateInfo: _updateInfo
    };
})();

module.exports = hUser;