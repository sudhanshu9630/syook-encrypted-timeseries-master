const fs = require('fs')
const { createHmac } = require('crypto');

const {encrypt,decrypt} = require('./crypto-ctr')


const key = 'G0LEVt8rY34dK6e97r6HMh6axZUf49qR'
const iv = 'YkWX62oMcP9oF4iT'


let data = fs.readFileSync(__dirname+'/data.json', 'utf8')
let jsonData = JSON.parse(data)

function getRandom(min, max){
  return Math.floor(Math.random()*(max-min)+min)
}

function getRandomMessages(){
  let currRandomLength = getRandom(49,499);
  const namesLength = jsonData.names.length;
  const citiesLength = jsonData.cities.length;

  let arr = []
  for(let i=0; i<currRandomLength;i++){
    let currName = jsonData.names[getRandom(0,namesLength)]
    let currOrg = jsonData.cities[getRandom(0,citiesLength)]
    let currDest = jsonData.cities[getRandom(0,citiesLength)]

    while(currOrg===currDest)
      currDest = jsonData.cities[getRandom(0,citiesLength)]

    let msg = {
      name : currName,
      origin : currOrg,
      destination : currDest
    }

    let secKey = getHash(JSON.stringify(msg))
    msg.secret_key = secKey
    arr.push(msg)
  }
  return arr
}

function getHash(txt) {
  const hash = createHmac('SHA256', 'secretkey')
    .update(txt, 'utf-8')
    .digest('base64');

  return hash;
}

function fetchEncryptedString(){
  let arr = getRandomMessages()
  let encryptedArr = []
  for(let i=0; i<arr.length;i++){
    encryptedArr.push(encrypt(JSON.stringify(arr[i]), key, iv));
  }
  let encryptedString = encryptedArr.join('|')

  return encryptedString
}

function validateIncomingData(incomingDataStream){

  let decryptedObj = decrypt(incomingDataStream, key, iv)

  if(decryptedObj){

      decryptedObj = JSON.parse(decryptedObj)
      let recievedMsg = {
        name : decryptedObj["name"],
        origin : decryptedObj["origin"],
        destination : decryptedObj["destination"]
      }


    let checkSecretKey = getHash(JSON.stringify(recievedMsg))


      if(checkSecretKey===decryptedObj.secret_key){
        return recievedMsg
      }
      else
       return null
  }
  return null
}



module.exports = {
  fetchEncryptedString,
  validateIncomingData
}