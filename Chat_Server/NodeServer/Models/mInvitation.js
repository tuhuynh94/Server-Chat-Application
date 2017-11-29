let mInvitation = (() =>{
    let _loadAll = (conn, callback)=>{
        let sql = "SELECT * FROM invite_friend";
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

    let _del_invitation = (conn,from,to) => {
        let sql = "DELETE FROM invite_friend  WHERE from_phone = '" + from + "' AND to_phone = '"+to+"'";        
        console.log(sql);
        conn.query(sql, function (err, rows) {
            if (err != null) {
                console.log("_update user fail");
                throw err;
            }
        });
        
    };

    let _add_invitation = (conn,socket,to) => {
        let sql = "INSERT INTO `invite_friend` (`from_phone`,`from_user`,`to_phone`, `invited_at`,`status`)VALUES ('"
        + socket.phone + "', '" + socket.username + "','" + to + "', '','');";   
        console.log(sql);
        conn.query(sql, function (err, rows) {
            if (err != null) {
                console.log("_update user fail");
                throw err;
            }
        });
        
    };


    return{
        loadAll: _loadAll
        , del_invitation:_del_invitation
        ,add_invitation : _add_invitation
    }

})();

module.exports = mInvitation;
