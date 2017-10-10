var mConversations = (function(){
    var _loadAll = function(conn, callback){
        var sql = "SELECT * FROM conversations";
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

module.exports = mConversations;
