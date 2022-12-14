const express = require('express');
const deleteuser = require('../models/login_model');
const router = express.Router();
const publicVisualizations = require('../models/visualization_model')


/// Delete user by its ID
router.delete('/:userID', function (request, response) {
    if (request.params.userID) {
        const userID = request.params.userID;

        // deleting user generated visualizations
        publicVisualizations.deleteUsersVisualizations(userID, function (dberr, dbresult) {
            if (dberr) {
                // if error send error
                response.status(404).send("database error in visualizations")
            }
            else {
                // If there was no errors lets delete user
                deleteuser.deleteuser(userID, function (dberr, dbresult) {
                    if (dberr) {
                        // if error send error
                        response.status(404).send("database error in users")
                    }
                    else {
                        // Send true
                        response.send(true)
                    }
                })
            }
        })
    }
    else {
        response.status(400).send("bad request")
    }
})

module.exports = router;