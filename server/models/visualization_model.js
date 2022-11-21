const db = require('../database');

const publicVisualizations = {
    createPublicVisualization: function (url, userID, callback) {
        return db.query('INSERT INTO publicVisualizations (url, userID) VALUES (?,?)', [url, userID], callback);
    },
    createVisualization: function (url, userID, title, description, columns, callback) {
        return db.query('INSERT INTO visualizationsAndUrl (url, visualizations, title, description, columns) VALUES (?,?,?,?,?)', [url, userID, title, description, columns], callback);
    },
    getVisualizationsbyUrl: async function (url, callback) {
        return db.query('SELECT * FROM visualizationsAndUrl where url= ?', [url], callback);
    }
};

module.exports = publicVisualizations;