const http = require('http');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat',
    charset: 'utf8_general_ci'
});
var loadAll = function (conn){
        var sql = "SELECT * FROM users";
        var results = [];
        return new Promise((resolve, reject) => {
            conn.query(sql, function(err,rows){
                if(err){
                    reject(err);                
                }
                else{
                    var results = JSON.parse(JSON.stringify(rows));
                    console.log(results);
                    resolve(results);
                }
            });
        });
};

http.createServer(async function (req, res) {
    console.log(`${req.method} ${req.url}`);   
    var tmp = await loadAll(connection);
    console.log(tmp);
    res.end(tmp);
}).listen(1234);

console.log('Server listening on port 1234');