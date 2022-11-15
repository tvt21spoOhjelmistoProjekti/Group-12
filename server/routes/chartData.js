const express = require('express');
const router = express.Router();
const chartData = require('../models/data_model')

router.get('/:tablename', function (req, res) {
    if (req.params.tablename) {
        console.log(req.params.tablename)
        chartData.getTable(req.params.tablename, (dberr, dbresult) => {
            if (dberr) {
                res.send(dberr)
            } else {
                res.send(dbresult)
            }
        })
    }
})
module.exports = router;