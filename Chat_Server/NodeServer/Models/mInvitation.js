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

    let _update_invitation = (conn,from,to,status) => {
        let sql = "UPDATE invite_friend SET status ="+status
         + " WHERE from_phone = '" + from + "' AND to_phone = '"+to+"'";        
        conn.query(sql, function (err, rows) {
            if (err != null) {
                console.log("_update user fail");
                throw err;
            }
        });
        
    };

    let _add_invitation = (conn,from,username,to) => {
        let sql = "INSERT INTO `invite_friend` (`from_phone`,`from_user`,`to_phone`, `invited_at`,`status`) VALUES ('"
         + from + "', '" + username + "','" + to + "', '',);";       
        conn.query(sql, function (err, rows) {
            if (err != null) {
                console.log("_update user fail");
                throw err;
            }
        });
        
    };


    return{
        loadAll: _loadAll
        , update_invitation:_update_invitation
        ,add_invitation : _add_invitation
    }

})();

module.exports = mInvitation;
