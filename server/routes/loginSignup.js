const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const login = require('../models/login_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { response } = require('../app');

router.post('/', function (request, response) {
    if (request.body.username && request.body.password) {
        const username = request.body.username;
        const password = request.body.password;
        login.checkPassword(username, function (dbError, dbresult) {
            if (dbError) {
                response.status(404).send("database error")
            }
            else {
                if (dbresult.length > 0) {
                    bcrypt.compare(password, dbresult[0].password, function (err, compareResult) {
                        if (compareResult) {
                            const token = generateAccessToken({ username: username });
                            const returnobj = {
                                token: token,
                                fullname: dbresult[0].fullname,
                                idUsers: dbresult[0].idUsers,
                                username: username
                            }
                            response.send(returnobj)
                        }
                        else {
                            response.status(403).send("wrong password")
                        }
                    })
                } else {
                    response.status(403).send("Username does not exist")
                }
            }
        })
    } else {
        response.send(400)
    }
}
);

router.post('/signup', function (request, response) {
    if (request.body.fullname && request.body.username && request.body.password && request.body.age) {
        console.log("here")
        login.adduser(request.body.fullname, request.body.password, request.body.username, request.body.age, function (dbError, dbresult) {
            if (dbError) {
                response.status(403).send("Username already exist")
            }
            else {
                login.getUserID(request.body.username, function (dberr, dbresult) {
                    if (dberr) {
                        response.send("err")
                    } else {
                        const token = generateAccessToken({ username: request.body.username });
                        const returnobj = {
                            token: token,
                            fullname: request.body.fullname,
                            idUsers: dbresult[0].idUsers,
                            username: request.body.username
                        }
                        response.send(returnobj)
                    }
                })
            }
        })
    } else {
        response.send(400)
    }
})

function generateAccessToken(username) {
    dotenv.config();
    return jwt.sign(username, process.env.MY_TOKEN, { expiresIn: '30d' });
}
module.exports = router;