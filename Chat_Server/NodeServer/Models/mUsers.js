let mUsers = (()=>{
    let _loadAll = (conn, callback)=>{
        let sql = "SELECT * FROM users";
        let results = [];
        conn.query(sql, function(err,rows){
            if(err){
                callback(results);
                throw err;                
            }
            else{
                let results = JSON.parse(JSON.stringify(rows));
                callback(results);
            }
        });
    };

    return{
        loadAll: _loadAll
    }

})();

module.exports = mUsers;
