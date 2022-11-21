const express = require('express');
const router = express.Router();
const publicVisualizations = require('../models/visualization_model')

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

router.post('/create', (req, res) => {
    if (req.body.userId && req.body.visualizations && req.body.title && req.body.desc && req.body.columns) {
        const userID = req.body.userId;
        const visu = req.body.visualizations;
        const title = req.body.title;
        const description = req.body.desc;
        const columns = req.body.columns;

        console.log("here")
        const randomUrl = makeid(15);

        publicVisualizations.createPublicVisualization(randomUrl, userID, (dbError, dbresult) => {
            if (dbresult) {
                //res.send(dbresult)
                publicVisualizations.createVisualization(randomUrl, visu, title, description, columns, (dbError, dbresult) => {
                    if (dbresult) {
                        res.send(randomUrl)
                    }
                    else {
                        res.send(dbError)
                    }
                })
            }
            else {
                res.send("userID Error")
            }
        })

    }
})

module.exports = router;