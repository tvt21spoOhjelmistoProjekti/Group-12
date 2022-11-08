const db = require('../database');

const login={
  checkPassword: function(username, callback) {
      return db.query('SELECT password, fullname, idUsers FROM Users WHERE userName = ?',[username], callback); 
    }
};
          
module.exports = login;