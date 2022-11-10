const express = require('express');
const deleteuser = require('../models/login_model');
const router = express.Router();

router.post('/', function (request, response) {
    console.log("joo")
    if (request.body.username) {
        const username = request.body.username;

        deleteuser.deleteuser(request.body.username, function (dberr, dbresult) {
            if (dberr) {
                response.send('err')
            }
            else {
                const returnobj = {
                    username: request.body.username
                }
                response.send(returnobj)
            }
        })
    }
})

module.exports = router;