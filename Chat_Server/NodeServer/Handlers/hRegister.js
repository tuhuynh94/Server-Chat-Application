const Client = require('authy-client').Client;
const authy = new Client({
    key: '229D9wObUA8tWTVw6rDOeLqq15mQdgLU'
});

const enums = require('authy-client').enums;

var hRegister = (function () {   
    var _register = function (socket, data, conn) {
         console.log("================hRegister==================")
        var sql = "INSERT INTO users (`phone`, `password`, `username`) VALUES(" + "0" + socket.phone + "," + data["pass"] + "," + "0" + socket.phone + ")";
        console.log(sql);
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
    //             socket.emit('return_verification_code', {
    //                 success: is_success
    //             });
    //             console.log("return_verification_code Success");
    //         }).fail(function (errorInfo) {
    //             // Act on error
    //             socket.emit('return_verification_code', {
    //                 success: is_success
    //             });
    //             console.log(errorInfo + "");
    //         });
    //     });
    // }
    var _request = function (socket, data, conn) {
        console.log("=========REQUEST =========");
        
        var is_success = false;
        var info;
        var sql = "SELECT `phone` FROM `users` WHERE `phone` = '" + socket.phone + "';";
        //console.log(sql);
        let checkUser = (sql) => {
            return new Promise((resolve, reject) => {
                conn.query(sql, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    if (rows.length <= 0) {
                        resolve(true);
                    } else {
                        info = "This phone is already registered";
                        resolve(false);
                    }
                });
            });
        };
        checkUser(sql).then(res => {
            if (res) {
                authy.startPhoneVerification({ countryCode: 'VN', locale: 'vn', phone: socket.phone, via: enums.verificationVia.SMS }, function (err, res) {
                    if (err) {
                        console.log("GET CODE: ERROR - authy");
                        socket.emit('return_verification_code', {
                            success: false,
                            info : err + ""
                        });
                    } else {
                        console.log("GET CODE: success");
                        socket.emit('return_verification_code', {
                            success: true,
                        });
                    }
                });
            } else {
                console.log("GET CODE: ERROR - REGISTED");
                socket.emit('return_verification_code', {
                    success: false,
                    info : info
                });
            }
        });

    }
    var _response = function (socket, data) {
        // console.log("========== RESPONSE =========");
        //PIN is retrieved from user
        var code = data['code'];
         console.log("========== RESPONSE ========= " + code);
        authy.verifyPhone({ countryCode: 'VN', phone: socket.phone, token: code }, function (err, res) {
            if (err) {
                console.log(err)
                socket.emit('return_verification', {
                    success: false
                });
            } else {
                socket.emit('return_verification', {
                    success: true
                    , code: code
                });
            }
        });
    }

    return {
        register: _register,
        request: _request,
        response: _response
    };
})();
module.exports = hRegister;