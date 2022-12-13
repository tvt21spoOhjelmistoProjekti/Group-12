const express = require('express');
const deleteuser = require('../models/login_model');
const router = express.Router();
const publicVisualizations = require('../models/visualization_model')

router.delete('/:userID', function (request, response) {
    if (request.params.userID) {
        const userID = request.params.userID;

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
        response.status(400).send("bad request")
    }
})

module.exports = router;