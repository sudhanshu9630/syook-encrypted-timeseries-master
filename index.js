const express = require('express')
var cors = require('cors')

const appRouter = require('./services/approuter')
const establishConn = require('./services/conn')


const app = express()

app.use(express.json())
app.use(cors())

establishConn()

console.log("here")
app.use('/api', appRouter);

app.listen(8000,()=>{console.log('Server running at port : 8000')})