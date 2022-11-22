const express = require('express');
const router = express.Router();
const publicVisualizations = require('../models/visualization_model')
const chartData = require('../models/data_model');


router.get('/:url', async (req, res) => {
    if (req.params.url) {
        publicVisualizations.getVisualizationsbyUrl(req.params.url, async (dbErr, dbresult) => {
            if (dbErr) {
                res.send("err")
            } else {
                const visalizations = dbresult[0].visualizations;
                const splitedVisual = visalizations.split(",")
                var returnArray = []
                returnArray.push({
                    details: {
                        title: dbresult[0].title,
                        description: dbresult[0].description,
                        columns: dbresult[0].columns
                    }
                })

                function getData(tableName) {
                    return new Promise((resolve, rejected) => {
                        chartData.getTable(tableName, (dbErr, dbresult) => {
                            if (dbErr) rejected(dbErr)
                            console.log("success")
                            const newArray = { [tableName]: dbresult }
                            returnArray.push(newArray)
                            resolve(dbresult)
                        })
                    })
                }
                for (let i = 0; i < splitedVisual.length; i++) {
                    await getData(splitedVisual[i])
                }

                res.send(returnArray)

            }
        })
    }
})

module.exports = router;