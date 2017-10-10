var SinchClient = require('sinch-rtc');
var sinchClient = new SinchClient({ applicationKey: "ccefb163-3eac-4dc9-af88-5bad7d4f541b" })

var hRegister = (function () {
    var _request = function (socket, data) {
        console.log("========== REQUEST =========");
        var verification = sinchClient.createSmsVerification("+84" + socket.phone);
        verification.initiate().then(function (successInfo) {
            // Act on success
            // Display "enter pin" UI
            socket.emit('return_verfication_code', {
                success: true
            });
            console.log("Success");
        }).fail(function (errorInfo) {
            // Act on error
            socket.emit('return_verfication_code', {
                success: false
            });
            console.log(errorInfo);
        });
    }

    var _respose = function (socket, data) {
        console.log("========== RESPOSE =========");
        var verification = sinchClient.createSmsVerification("+84" + socket.phone);
        //PIN is retrieved from user
        var code = data.code;
        verification.verify(code).then(function (successInfo) {
            console.log("Success");
            socket.emit('return_verfication', {
                success: true
                , code: data['code']
            });
            // Act on success (valid number)
        }).fail(function (errorInfo) {
            // Act on error and inform the user / retry
            console.log(err)
            socket.emit('return_verfication', {
                success: false
            });
        });
    }
    var _retry = function(socket, data){
        var verification = sinchClient.createSmsVerification("+84" + socket.phone);
        
        //Re-send a verification code 
        verification.retry().then(function() {
            socket.emit('return_verfication_code', {
                success: true
            });
            //Ask user to enter secret CODE
        }).fail(function(error) {
            //Infom user of error sending SMS (more info in error.message)
            socket.emit('return_verfication_code', {
                success: false
            });
        }); 
    }

    return {
        request: _request,
        respose: _respose,
        retry: _retry
    };
})();
module.exports = hRegister;