// import openSocket from 'socket.io-client';
var rxjs = require('rxjs')
var ops = require('rxjs/operators')
var io = require('socket.io-client')


const socket = io('http://localhost:5000');

function effects(store) {

    store.on('newPlayer')
    .subscribe((player) =>{
        console.log("newPlayer",player)
        socket.emit("newPlayer",player)
    })

    store.on('removePlayer')
    .subscribe((player) =>{
      console.log("removePlayer",player)
      socket.emit("removePlayer", player)
    })

  return store
}


module.exports = effects