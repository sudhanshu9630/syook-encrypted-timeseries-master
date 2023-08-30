require('dotenv').config()
const {fetchEncryptedString} = require('./utils/helpers')
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');
console.log("emitter-started")

ws.on('open', function open() {
  setInterval(function(){   
      let data = fetchEncryptedString()
      console.log("sending-data-from-emitter : "+data) 
    ws.send(
        data
    );
  }, 10000)

});