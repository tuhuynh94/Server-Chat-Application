let mFriends = (() => {
    let _loadAll = (conn, callback) => {
        let sql = "SELECT * FROM friends";
        let results = [];
        conn.query(sql, function (err, rows) {
            if (err) {
                callback(results);
                throw err;
            } else {
                let results = JSON.parse(JSON.stringify(rows));
                callback(results);
            }
        });

    };
    let _add_friend = async(conn, socket, friend_phone, callback) => {
        let user = await _func_user(friend_phone, conn);
        console.log("user "+ user);
        await _insert(user,conn,socket);           
        let f = await _func_friend(friend_phone, socket, conn);
        return f;
    }

    let _func_user = async(friend_phone, conn) => {
        let temp = await _loadUser(friend_phone, conn);
        let user = null;
        if (temp.length > 0) {
            user = temp[0];
            return user;
        } else {
            return user;
        }
    };
    let _loadUser = (friend_phone, conn) => {
        let sql = "SELECT * FROM users WHERE phone = '" + friend_phone + "'";
        console.log(sql);
        let result = [];
        return new Promise((resolve, reject) => {
            conn.query(sql, function (err, rows) {
                if (err) {
                    reject(result);
                } else {
                    result = JSON.parse(JSON.stringify(rows));
                    resolve(result);
                }
            });
        });
    };
    let _insert = (user, conn, phone) => {
        let sql = "INSERT INTO `friends`(`id`, `phone`, `friend_phone`, `email`, `birthday`, `username`, `add_at`) VALUES (" +
            "NULL,'" + phone + "','" + user.phone + "','" + user.email + "','" + user.birthday + "','" + user.username + "',NOW())";
        let result = [];
        console.log("INSERT  - - " + sql);
        conn.query(sql, function (err, rows) {
            if (err) {
                reject(result);
            }
        });
    }
    let _func_friend = async(friend_phone,socket, conn) => {
        let temp = await _loadFriend(friend_phone, socket, conn);
        let friend = null;
        if (temp.length > 0) {
            friend = temp[0];
            return friend;
        } else {
            return friend;
        }
    };
    let _loadFriend = (friend_phone, socket, conn) => {
        let sql = "SELECT * FROM friends WHERE friend_phone = '" + friend_phone + "'AND phone = '" + socket + "'";
        console.log(sql);
        let result = [];
        return new Promise((resolve, reject) => {
            conn.query(sql, function (err, rows) {
                if (err) {
                    reject(result);
                } else {
                    result = JSON.parse(JSON.stringify(rows));
                    resolve(result);
                }
            });
        });
    };


    return {
        loadAll: _loadAll,
        add_friend: _add_friend
    }

})();

module.exports = mFriends;