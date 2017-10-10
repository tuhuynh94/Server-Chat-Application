// var SinchClient = require('sinch-rtc');
// var sinchClient = new SinchClient({applicationKey: YOUR_APPLICATION_KEY})
// var verification = sinchClient.createSmsVerification(PHONE_NUMBER)
// verification.initiate().then(function(successInfo) {
//     // Act on success
//     // Display "enter pin" UI
// }).fail(function(errorInfo) {
//     // Act on error
// });
// //PIN is retrieved from user
// var code = codeFromUser;
// verification.verify(code).then(function(successInfo) {
//     // Act on success (valid number)
// }).fail(function(errorInfo) {
//     // Act on error and inform the user / retry
// });