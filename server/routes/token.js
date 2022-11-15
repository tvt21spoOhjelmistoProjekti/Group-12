const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const login = require('../models/login_model');

router.get('/:username', function (request, response) {
    const username = request.params.username;
    login.getAll(username, function (dbError, dbresult) {
        if (dbError) {
            response.send(dbError)
        }
        else {
            if (dbresult.length > 0) {
                const token = generateAccessToken({ username: username });
                const returnobj = {
                    token: token,
                    fullname: dbresult[0].fullname,
                    idUsers: dbresult[0].idUsers,
                    username: username
                }
                response.send(returnobj)
            }
        }
    })
})


function generateAccessToken(username) {
    dotenv.config();
    return jwt.sign(username, process.env.MY_TOKEN, { expiresIn: '30d' });
}
module.exports = router;