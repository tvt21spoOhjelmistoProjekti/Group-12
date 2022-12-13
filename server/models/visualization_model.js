const db = require('../database');

const publicVisualizations = {
    createVisualization: function (userID, url, visualizations, title, description, columns, callback) {
        return db.query('INSERT INTO visualizationsAndUrl (userID, url, visualizations, title, description, columns) VALUES (?,?,?,?,?,?)', [userID, url, visualizations, title, description, columns], callback);
    },
    getVisualizationsbyUrl: async function (url, callback) {
        return db.query('SELECT * FROM visualizationsAndUrl where url= ?', [url], callback);
    },
    deleteUsersVisualizations: function (userID, callback) {
        return db.query('DELETE FROM visualizationsAndUrl WHERE userID = ?', [userID], callback);
    },
    getMyVisualizations: async function (userID, callback) {
        return db.query('SELECT * FROM visualizationsAndUrl where userID = ?', [userID], callback);
    },
    deleteMyVisualizations: function (url, callback) {
        return db.query('DELETE FROM visualizationsAndUrl WHERE url = ?', [url], callback);
    }
};

module.exports = publicVisualizations;