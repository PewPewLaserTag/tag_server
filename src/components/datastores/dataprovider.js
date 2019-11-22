var Store = require('./dataStore')
var io = require('socket.io-client')

const store = Store.useStore()

const socket = io('http://localhost:5000');

socket.on('newPlayerAdded',()=>{
  console.log("it worked")
})

module.exports = socket