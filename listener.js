const {WebSocketServer} = require('ws')
const {validateIncomingData} = require('./utils/helpers') 
const wss = new WebSocketServer({ port: 3000 });

const {saveToDb} = require('./services/db-service')
const establishConn = require('./services/conn')

console.log('listener-started')
establishConn()

wss.on('connection', function connection(ws) {
  try {
    ws.on('message', function incoming(message) {
      let incomingData = message.toString().split('|');
      incomingData.forEach(item => {
        let validatedData = validateIncomingData(item)

        if(validatedData!=null){
          //store to DB
          console.log(validatedData)
          let date  = new Date()
          saveToDb(validatedData.name, validatedData.origin, validatedData.destination,date)
        }
      })
    });

    ws.on('error', function onError(err) {
      console.log("Error while receiving message", err);
    })
  }
  catch (err) {
    console.log("Connection error!!", err);
  }
});