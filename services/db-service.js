const TimeSeries = require('../models/timeseries')

module.exports.saveToDb = async(name, origin, destination, timestamp) => {
    try{
        let timeSeriesData = await TimeSeries.create({timestamp, name, origin, destination})
    }catch(err){
        console.log(err)
    }
}

module.exports.getFromDB = async(req, res) => {
    try{
        res.send('Hello')
    }catch(err){
        console.log(err)
    }
}
