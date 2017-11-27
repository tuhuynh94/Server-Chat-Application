let mMessages = (()=>{
    let _loadAll = (conn, callback)=>{
        let sql = "SELECT * FROM messages";
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
    let _add_msg = (conn, conversation_id, msg, phone, create_at)=>{
        let sql ="INSERT INTO messages (message_id, conversation_id, creator, message, created_at)VALUES ('NULL','" +"','"+phone+"','"+msg+"','"+create_at+"';";

        conn.query(sql, function (err, rows) {
            if (err != null) {
                console.log("_update user fail");
                throw err;
            }
        });

    } 


    return{
        loadAll: _loadAll
        , add_msg :_add_msg
    }

})();

module.exports = mMessages;
