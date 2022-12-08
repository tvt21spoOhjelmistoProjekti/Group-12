const express = require('express');
const router = express.Router();
const publicVisualizations = require('../models/visualization_model')
const chartData = require('../models/data_model');
const { response } = require('express');


router.get('/:url', async (req, res) => {
    if (req.params.url) {
        publicVisualizations.getVisualizationsbyUrl(req.params.url, async (dbErr, dbresult) => {
            if (dbErr) {
                res.send("err")
            } else {
                if (dbresult.length <= 0) {
                    res.status(403).send("wrong url")
                    return
                }
                const visalizations = dbresult[0].visualizations;
                const splitedVisual = visalizations.split(",")
                var returnObj = {}
                returnObj = {
                    details: {
                        title: dbresult[0].title,
                        description: dbresult[0].description,
                        columns: dbresult[0].columns
                    }
                }

                function getData(tableName) {
                    return new Promise((resolve, rejected) => {
                        chartData.getTable(tableName, (dbErr, dbresult) => {
                            if (dbErr) rejected(dbErr)
                            returnObj = { ...returnObj, [tableName]: dbresult }
                            resolve(dbresult)
                        })
                    })
                }
                for (let i = 0; i < splitedVisual.length; i++) {
                    await getData(splitedVisual[i])
                }

                res.send(returnObj)

            }
        })
    }
})

module.exports = router;