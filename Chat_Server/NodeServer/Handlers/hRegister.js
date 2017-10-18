var SinchClient = require('sinch-rtc');
var sinchClient = new SinchClient({
    applicationKey: "ccefb163-3eac-4dc9-af88-5bad7d4f541b"
})

var hRegister = (function () {
       console.log("================hRegister==================")
    var _register = function (socket, data, conn) {
        var sql = "SELECT `phone` FROM `users` WHERE `phone` = '" + socket.phone + "';";
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
            console.log("---------------------------");
            socket.emit('return_register', {
                success: true
            });
        };
    };
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
            var verification = sinchClient.createSmsVerification("+84" + socket.phone);
            verification.initiate().then(function (successInfo) {
                // Act on success
                // Display "enter pin" UI
                socket.emit('return_verfication_code', {
                    success: is_success
                });
                console.log("return_verfication_code Success");
            }).fail(function (errorInfo) {
                // Act on error
                socket.emit('return_verfication_code', {
                    success: is_success
                });
                console.log(errorInfo);
            });
        })
    }
    var _respose = function (socket, data) {
        console.log("========== RESPOSE =========");
        var verification = sinchClient.createSmsVerification("+84" + socket.phone);
        //PIN is retrieved from user
        var code = data.code;
        verification.verify(code).then(function (successInfo) {
            console.log("return_verification Success");
            socket.emit('return_verification', {
                success: true,
                code: data['code']
            });
            // Act on success (valid number)
        }).fail(function (errorInfo) {
            // Act on error and inform the user / retry
            console.log(err)
            socket.emit('return_verification', {
                success: false
            });
        });
    }
    var _retry = function (socket, data) {
        var verification = sinchClient.createSmsVerification("+84" + socket.phone);

        //Re-send a verification code 
        verification.retry().then(function () {
            socket.emit('return_verification_code', {
                success: true
            });
            //Ask user to enter secret CODE
        }).fail(function (error) {
            //Infom user of error sending SMS (more info in error.message)
            socket.emit('return_verification_code', {
                success: false
            });
        });
    }

    return {
        register:_register,
        request: _request,
        respose: _respose,
        retry: _retry
    };
})();
module.exports = hRegister;