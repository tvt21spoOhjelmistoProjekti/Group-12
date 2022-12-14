const express = require('express');
const router = express.Router();
const publicVisualizations = require('../models/visualization_model')


// create random url
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// create new visualization
router.post('/create', (req, res) => {
    if (req.body.userId && req.body.visualizations && req.body.title && req.body.desc && req.body.columns) {
        const userID = req.body.userId;
        const visu = req.body.visualizations;
        const title = req.body.title;
        const description = req.body.desc;
        const columns = req.body.columns;

        console.log("here")
        // call randomurl generator
        const randomUrl = makeid(15);

        // push all data to mysql
        publicVisualizations.createVisualization(userID, randomUrl, visu, title, description, columns, (dbError, dbresult) => {
            if (dbresult) {
                // if success send randomurl
                res.send(randomUrl)
            }
            else {
                if (dbError.errno === 1452) {
                    // if error send error
                    res.status(403).send("username does not exist")
                }
                // if error send error
                res.status(403).send("Something went worng")
            }
        })

    }
    else {
        // if error send error
        response.send(400)
    }
})

router.get('/myvisual/:id', (req, res) => {
    if (req.params.id) {
        const userID = req.params.id

        console.log(userID)
        publicVisualizations.getMyVisualizations(userID, (dbError, dbresult) => {
            if (dbresult) {
                res.send(dbresult)
            }
            else {
                res.send(dbError)
            }
        })
    }
})

router.delete('/:url', async (request, response) => {
    if (request.params.url) {
        console.log(request.params.url)
        publicVisualizations.deleteMyVisualizations(request.params.url, async (dberr, dbresult) => {
            if (dberr) {
                response.send(dberr)
            }
            else {
                response.send(true)
            }
        })
    }
    else {
        console.log("dberror")
    }

})

module.exports = router;