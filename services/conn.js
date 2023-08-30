const mongoose = require('mongoose');

function establishConn(){
    const mongoDB = 'mongodb://localhost/syookDB';
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected-to-db')
    }).catch(err => console.log(err))
}


module.exports = establishConn