
var hUser = (function () {
   // need verification code
    var _register = function (socket, data, conn) {
        var flat = false;
        var info = "";
        var sql = "SELECT `phone` FROM `users` WHERE `phone` = '" + "13433" + "';";
        let addUser = (sql) => {
            return new Promise((resolve, reject) => {
                conn.query(sql, function (err, rows) {
                    if (err) {
                        info = err;
                        flat = false;
                        reject(err);
                    } else {
                        info = JSON.stringify(rows);
                        flat = true;
                        console.log(info);
                        resolve(info);
                    }
                });
            });
        };
        let checkUser = (sql) => {
            return new Promise((resolve, reject) => {
                conn.query(sql, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    if (rows.length <= 0) {
                        sql = "INSERT INTO `users` (`phone`,`username`, `password`, `birthday`, `email`) VALUES ('" + "13433" + "' ,'" + data["username"] + "', '" + data["pass"] + "', NULL, NULL)";
                        resolve("Success");
                    }
                    else {
                        info = "This phone is already registered";
                        flat = false;
                        console.log(info);
                        reject(info);
                    }
                });
            });
        };
        let Emit = async () => {
            await addUser(sql);
            console.log("---------------------------");
            socket.emit('return_register', {
                success: flat
                , info: info
            });
        };
        checkUser(sql).then(res => {
            sql = "INSERT INTO `users` (`phone`,`username`, `password`, `birthday`, `email`) VALUES ('" + "13433" + "' ,'" + data["username"] + "', '" + data["pass"] + "', NULL, NULL)";
            Emit();
        }).catch(err => console.log(err));
    };

    var _login = function (socket, data,conn) {
        console.log("========== login =========");
        var sql = "SELECT `phone`, `username`, `email`, `birthday` FROM `users` WHERE `phone` = '"+"13433"+"' OR `username` = "+ data['username']+" AND `password` = '"+ data["pass"]+"' ;";
        conn.query(sql, function (err, rows) {
            if (typeof (rows.length) != "undefined" && rows.length >= 0) {
                socket.emit('return_login',{
                    success: true
                    ,info:JSON.parse(JSON.stringify(rows))
                });        
            }
            else{
                socket.emit('return_login',{
                    success: false
                    ,info:"this phone is already created"
                }); 
            }
        });
    };

    var _updateInfo = function (socket, data) {
        var sql = "UPDATE `users` SET `password` = '"+data["pass"]+"', `password` = '"+data["pass"]+"', `birthday` = '"+data["pass"]+"', `email` = '"+data["pass"]+"' WHERE `phone` = '"+socket.phone+"';";
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

    return{
        login:_login
        , register: _register
        , updateInfo: _updateInfo
    };
})();

module.exports = hUser;