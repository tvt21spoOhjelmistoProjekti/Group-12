const db = require('../database');

// MYSQL QUERIES
const chartData = {
    getTable: function (tableName, callback) {
        console.log(tableName)
        return db.query('SELECT * FROM ??', [tableName], callback);
    }
};

module.exports = chartData;