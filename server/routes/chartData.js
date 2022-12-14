const express = require('express');
const router = express.Router();
const chartData = require('../models/data_model')

/// Gets table from mysql by table name 
router.get('/:tablename', function (req, res) {
    if (req.params.tablename) {
        console.log(req.params.tablename)
        //Gets table
        chartData.getTable(req.params.tablename, (dberr, dbresult) => {
            if (dberr) {
                // if error send database error
                res.status(404).send(dberr)
            } else {
                // Send result
                res.send(dbresult)
            }
        })
    }
})
module.exports = router;