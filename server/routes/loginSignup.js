const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const login = require('../models/login_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');



// login request
router.post('/', function (request, response) {
    if (request.body.username && request.body.password) {
        const username = request.body.username;
        const password = request.body.password;
        // get crypted password
        login.checkPassword(username, function (dbError, dbresult) {
            if (dbError) {
                // if error send error
                response.status(404).send("database error")
            }
            else {
                if (dbresult.length > 0) {
                    // compare hash to users password
                    bcrypt.compare(password, dbresult[0].password, function (err, compareResult) {
                        if (compareResult) {
                            // if compare is true send token and and user data
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
                            // if error send error
                            response.status(403).send("wrong password")
                        }
                    })
                } else {
                    // if error send error
                    response.status(403).send("Username does not exist")
                }
            }
        })
    } else {
        // if error send error
        response.send(400)
    }
}
);

// register
router.post('/signup', function (request, response) {
    if (request.body.fullname && request.body.username && request.body.password && request.body.age) {
        console.log("here")
        // add user to mysql
        login.adduser(request.body.fullname, request.body.password, request.body.username, request.body.age, function (dbError, dbresult) {
            if (dbError) {
                // if error send error
                response.status(403).send("Username already exist")
            }
            else {
                // if success get id from mysql
                login.getUserID(request.body.username, function (dberr, dbresult) {
                    if (dberr) {
                        // if error send error
                        response.send("err")
                    } else {
                        // return token and user data
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
        // if error send error
        response.send(400)
    }
})


// generate token
function generateAccessToken(username) {
    dotenv.config();
    return jwt.sign(username, process.env.MY_TOKEN, { expiresIn: '30d' });
}
module.exports = router;