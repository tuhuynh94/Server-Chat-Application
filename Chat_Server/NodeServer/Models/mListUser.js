
var lst_user_online = {};
let mListUser = (() =>{
    let _get_lst_user_online = () => {
        return lst_user_online;
    };

    return {
        get_lst_user_online : _get_lst_user_online
    }
})();

module.exports = mListUser;