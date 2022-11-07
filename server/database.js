var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11537887',
    password: 'QIhYNS6m55',
    database: 'sql11537887'
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    } else{
        console.log('connected...!');

    }
});


module.exports = connection;