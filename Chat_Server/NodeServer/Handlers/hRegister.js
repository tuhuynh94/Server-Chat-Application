const Client = require('authy-client').Client;
const authy = new Client({
    key: '229D9wObUA8tWTVw6rDOeLqq15mQdgLU'
});

const enums = require('authy-client').enums;

var hRegister = (function () {
    console.log("================hRegister==================")
    var _register = function (socket, data, conn) {
        var sql = "INSERT INTO users (`phone`, `password`, `username`) VALUES(" + "0" + socket.phone + "," + data["pass"] + "," + "0" + socket.phone + ")";
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
        let Emit = async () => {
            await addUser(sql);
            console.log("-------------emit register to client--------------");
            socket.emit('return_register', {
                success: true
            });
        };
        Emit();
    };
    // var _request = function (socket, data, conn) {
    //     console.log("=========REQUEST =========");
    //     console.log(socket.phone);
    //     var is_success = false;
    //     var sql = "SELECT `phone` FROM `users` WHERE `phone` = '" + socket.phone + "';";
    //     let checkUser = (sql) => {
    //         return new Promise((resolve, reject) => {
    //             conn.query(sql, function (err, rows) {
    //                 if (err) {
    //                     reject(err);
    //                 }
    //                 if (rows.length <= 0) {
    //                     is_success = true;
    //                     resolve("Success");
    //                 } else {
    //                     info = "This phone is already registered";
    //                     reject(info);
    //                 }
    //             });
    //         });
    //     };
    //     checkUser(sql).then(res => {
    //         var verification = sinchClient.createSmsVerification("+84" + socket.phone);
    //         verification.initiate().then(function (successInfo) {
    //             console.log(successInfo +"");
    //             // Act on success
    //             // Display "enter pin" UI
    //             socket.emit('return_verfication_code', {
    //                 success: is_success
    //             });
    //             console.log("return_verfication_code Success");
    //         }).fail(function (errorInfo) {
    //             // Act on error
    //             socket.emit('return_verfication_code', {
    //                 success: is_success
    //             });
    //             console.log(errorInfo + "");
    //         });
    //     });
    // }
    var _request = function (socket, data, conn) {
        console.log("=========REQUEST =========");
        console.log(socket.phone);
        var is_success = false;
        var sql = "SELECT `phone` FROM `users` WHERE `phone` = '" + socket.phone + "';";
        let checkUser = (sql) => {
            return new Promise((resolve, reject) => {
                conn.query(sql, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    if (rows.length <= 0) {
                        is_success = true;
                        resolve("Success");
                    } else {
                        info = "This phone is already registered";
                        reject(info);
                    }
                });
            });
        };
        checkUser(sql).then(res => {
            authy.startPhoneVerification({ countryCode: 'VN', locale: 'vn', phone: socket.phone, via: enums.verificationVia.SMS }, function (err, res) {
                if (err) {
                    socket.emit('return_verfication_code', {
                        success: is_success
                    });
                } else {
                    socket.emit('return_verfication_code', {
                        success: is_success
                    });
                }
            });
        });

    }
    var _respose = function (socket, data) {
        console.log("========== RESPOSE =========");
        //PIN is retrieved from user
        var code = data['code'];
        authy.verifyPhone({ countryCode: 'VN', phone: socket.phone, token: code }, function (err, res) {
            if (err) {
                console.log(err)
                socket.emit('return_verfication', {
                    success: false
                });
            } else {
                socket.emit('return_verfication', {
                    success: true
                    , code: code
                });
            }
        });
    }

    return {
        register: _register,
        request: _request,
        respose: _respose
    };
})();
module.exports = hRegister;