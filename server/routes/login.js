const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const login = require('../models/login_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.post('/', function(request, response) {
    if(request.body.username && request.body.password){
     const username = request.body.username;
     const password = request.body.password;
     login.checkPassword(username, function (dbError,dbresult){
        if (dbError){
            response.send(dbError) 
        }
        else{
            if (dbresult.length >0){
                bcrypt.compare(password,dbresult[0].password, function(err,compareResult){
                if(compareResult) {
                    const token = generateAccessToken({ username: username });
                    const returnobj = {
                        token: token,
                        fullname:dbresult[0].fullname,
                        idUsers:dbresult[0].idUsers,
                        username: username
                    }
                    response.send(returnobj)
                }
                else{
                    response.send("wrong password")
                }
                })
            }
        }
     })
     }
    }
);


function generateAccessToken(username) {
    dotenv.config();
    return jwt.sign(username, process.env.MY_TOKEN, { expiresIn: '30d' });
}
module.exports=router;