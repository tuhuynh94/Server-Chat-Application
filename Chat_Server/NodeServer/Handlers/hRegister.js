const Client = require('authy-client').Client;
const authy = new Client({
    key: '229D9wObUA8tWTVw6rDOeLqq15mQdgLU'
});

const enums = require('authy-client').enums;

let hRegister = (  () =>{   
    let _register =   (socket, data, conn) =>{
         console.log("================hRegister==================")
        let sql = "INSERT INTO users (`phone`, `password`, `username`,`birthday`) VALUES(" + "'0" + socket.phone + "'," + data["pass"] + "," + "'0" + socket.phone + "','NULL')";
        console.log(sql);
        let addUser = (sql) => {
            return new Promise((resolve, reject) => {
                conn.query(sql,function (err, rows) {
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
    // let _request =   (socket, data, conn) {
    //     console.log("=========REQUEST =========");
    //     console.log(socket.phone);
    //     let is_success = false;
    //     let sql = "SELECT `phone` FROM `users` WHERE `phone` = '" + socket.phone + "';";
    //     let checkUser = (sql) => {
    //         return new Promise((resolve, reject) => {
    //             conn.query(sql,   (err, rows) {
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
    //         let verification = sinchClient.createSmsVerification("+84" + socket.phone);
    //         verification.initiate().then(  (successInfo) {
    //             console.log(successInfo +"");
    //             // Act on success
    //             // Display "enter pin" UI
    //             socket.emit('return_verification_code', {
    //                 success: is_success
    //             });
    //             console.log("return_verification_code Success");
    //         }).fail(  (errorInfo) {
    //             // Act on error
    //             socket.emit('return_verification_code', {
    //                 success: is_success
    //             });
    //             console.log(errorInfo + "");
    //         });
    //     });
    // }
    let _request =   (socket, data, conn) =>{
        console.log("=========REQUEST =========");
        
        let is_success = false;
        let info;
        let sql = "SELECT `phone` FROM `users` WHERE `phone` = '" + socket.phone + "';";
        //console.log(sql);
        let checkUser = (sql) => {
            return new Promise((resolve, reject) => {
                conn.query(sql,function(err, rows) {
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
                authy.startPhoneVerification({ countryCode: 'VN', locale: 'vn', phone: socket.phone, via: enums.verificationVia.SMS },function (err, res) {
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
    let _response =   (socket, data)=> {
        // console.log("========== RESPONSE =========");
        //PIN is retrieved from user
        let code = data['code'];
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