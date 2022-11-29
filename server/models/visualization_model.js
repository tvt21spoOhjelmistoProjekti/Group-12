const db = require('../database');

const publicVisualizations = {
    createVisualization: function (userID, url, visualizations, title, description, columns, callback) {
        return db.query('INSERT INTO visualizationsAndUrl (userID, url, visualizations, title, description, columns) VALUES (?,?,?,?,?,?)', [userID, url, visualizations, title, description, columns], callback);
    },
    getVisualizationsbyUrl: async function (url, callback) {
        return db.query('SELECT * FROM visualizationsAndUrl where url= ?', [url], callback);
    }
};

module.exports = publicVisualizations;