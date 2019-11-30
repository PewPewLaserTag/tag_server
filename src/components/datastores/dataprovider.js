var Store = require('./dataStore')
var io = require('socket.io-client')

const store = Store.useStore()

socket.on('newPlayerAdded',()=>{
  console.log("it worked")
})

module.exports = socket