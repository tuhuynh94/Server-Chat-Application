var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat',
    charset: 'utf8_general_ci'
});
connection.connect(function (err) {
    if (err) {
        console.log("Error connecting database");
    }
    else {
        console.log("Database is connect");
    }
});

var m_lst_users = [];
var mUsers = require('../Models/mUsers');
mUsers.loadAll(connection, function (cb_result) {
    m_lst_users = cb_result;
});

var m_lst_messages = [];
var mMessages = require('../Models/mMessages');
mMessages.loadAll(connection, function (cb_result) {
    m_lst_messages = cb_result;
});

var m_lst_message_seen = [];
var mMessage_seen = require('../Models/mMessage_seen');
mMessage_seen.loadAll(connection, function (cb_result) {
    m_lst_message_seen = cb_result;
});

var m_lst_invite_friends = [];
var mInvite_friends = require('../Models/mInvite_friends');
mInvite_friends.loadAll(connection, function (cb_result) {
    m_lst_invite_friends = cb_result;
});

var m_lst_friends = [];
var mFriends = require('../Models/mFriends');
mFriends.loadAll(connection, function (cb_result) {
    m_lst_friends = cb_result;
});

var m_lst_conversations = [];
var mConversations = require('../Models/mConversations');
mConversations.loadAll(connection, function (cb_result) {
    m_lst_conversations = cb_result;
});

var db = (function () {
    var _users = function () {
        return m_lst_users;
    }
    var _messages = function () {
        return m_lst_messages;
    }
    var _message_seen = function () {
        return m_lst_message_seen;
    }
    var _invite_friend = function () {
        return m_lst_invite_friends;
    }
    var _friends = function () {
        return m_lst_friends;
    }
    var _conversations = function () {
        return m_lst_conversations;
    }

    return {
        users: _users
        , messages: _messages
        , message_seen: _message_seen
        , friends: _friends
        , invite_friends: _invite_friend
        , conversations: _conversations
    }

})();

module.exports = db;