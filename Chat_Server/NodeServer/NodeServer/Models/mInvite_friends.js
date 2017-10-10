var mInvite_friends = (function(){
    var _loadAll = function(conn, callback){
        var sql = "SELECT * FROM invite_friend";
        var results = [];
        conn.query(sql, function(err,rows){
            if(err){
                callback(results);
                throw err;                
            }
            else{
                var results = JSON.parse(JSON.stringify(rows));
                callback(results);
            }
        });

    };


    return{
        loadAll: _loadAll
    }

})();

module.exports = mInvite_friends;
