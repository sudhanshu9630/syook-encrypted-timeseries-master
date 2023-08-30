const express = require('express')
const router = express.Router()
const TimeSeries = require('../models/timeseries')

router.get('/getdata', async(req, res)=>{
    try{
    console.log('getdata-service-called')
    const filter = {};
    const timeseriesRecords = await TimeSeries.find(filter)
    res.send(timeseriesRecords)
    }catch(err) {
        console.log(err)
        res.status(500).json({message : "something wet wrong"})
    }
    
 });

 module.exports =router