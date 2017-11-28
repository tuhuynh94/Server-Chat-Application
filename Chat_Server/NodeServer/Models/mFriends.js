let mFriends = (()=>{
    let _loadAll = (conn, callback)=>{
        let sql = "SELECT * FROM friends";
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
    let _add_friend =(conn, socket, friend_phone)=>{
         let sql = "INSERT INTO `friends`(`id`, `phone`, `friend_phone`, `email`, `birthday`, `username`, `add_at`) VALUES ("+
         "NULL,'"+friend_phone+"','"+socket.phone+"','"+socket.email+"','"+socket.birthday+"','"+socket.username+"',NOW())";
         console.log(sql);
        conn.query(sql, function(err,rows){
            if(err){
                console.log(" add friend fail");
                throw err;                
            }
        });
    }


    return{
        loadAll: _loadAll
        , add_friend:_add_friend
    }

})();

module.exports = mFriends;
