const db = require('../database');
const bcrypt = require('bcryptjs');

// MYSQL QUERIES
const login = {
  checkPassword: function (username, callback) {
    return db.query('SELECT password, fullname, idUsers FROM Users WHERE userName = ?', [username], callback);
  },
  adduser: function (fullname, password, username, age, callback) {
    bcrypt.hash(password, 10, function (err, hash) {
      return db.query('INSERT into Users (fullname, username, password, age) values(?,?,?,?)', [fullname, username, hash, age], callback);
    })
  },
  getUserID: function (username, callback) {
    return db.query('SELECT idUsers FROM Users WHERE userName = ?', [username], callback);
  },
  deleteuser: function (userID, callback) {
    return db.query('DELETE FROM Users WHERE idUsers = ?', [userID], callback);
  }
};

module.exports = login;