const express = require('express');
const deleteuser = require('../models/login_model');
const router = express.Router();
const publicVisualizations = require('../models/visualization_model')

router.post('/', function (request, response) {
    if (request.body.userID) {
        const userID = request.body.userID;

        publicVisualizations.deleteUsersVisualizations(userID, function (dberr, dbresult) {
            if (dberr) {
                response.status(404).send("database error in visualizations")
            }
            else {
                deleteuser.deleteuser(userID, function (dberr, dbresult)  {
                    if (dberr) {
                        response.status(404).send("database error in users")
                    }
                    else {
                        
                        response.send(true)
                    }
                })
            }
        })
    }
    else {
        response.status(400).send("database error")
    }
})

module.exports = router;