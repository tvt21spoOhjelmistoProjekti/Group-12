const express = require('express');
const router = express.Router();
const publicVisualizations = require('../models/visualization_model')
const chartData = require('../models/data_model');
const { response } = require('express');

// Get public visualization by URL
router.get('/:url', async (req, res) => {
    if (req.params.url) {
        // get visualization data from MYSQL
        publicVisualizations.getVisualizationsbyUrl(req.params.url, async (dbErr, dbresult) => {
            if (dbErr) {
                // if error send error
                res.status(404).send("err")
            } else {
                if (dbresult.length <= 0) {
                    // if wrong url send wrong url
                    res.status(403).send("wrong url")
                    return
                }

                // save all visualizations to new array
                const visalizations = dbresult[0].visualizations;
                const splitedVisual = visalizations.split(",")

                // object that we want return
                var returnObj = {}
                returnObj = {
                    details: {
                        title: dbresult[0].title,
                        description: dbresult[0].description,
                        columns: dbresult[0].columns
                    }
                }

                // function that gets all tables data that is wanted to shown at client
                // this needs to be New promise because we have to wait all tables to fetch
                function getData(tableName) {
                    return new Promise((resolve, rejected) => {
                        chartData.getTable(tableName, (dbErr, dbresult) => {
                            if (dbErr) rejected(dbErr)
                            returnObj = { ...returnObj, [tableName]: dbresult }
                            resolve(dbresult)
                        })
                    })
                }

                // call that function many times as we have tables
                for (let i = 0; i < splitedVisual.length; i++) {
                    await getData(splitedVisual[i])
                }
                // return data
                res.send(returnObj)

            }
        })
    }
})

module.exports = router;