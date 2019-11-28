// import openSocket from 'socket.io-client';
var rxjs = require('rxjs')
var ops = require('rxjs/operators')
var io = require('socket.io-client')


const socket = io(document.location.hostname+":5000");


function effects(store) {

    store.on('newPlayer')
    .subscribe((player) =>{
        socket.emit("newPlayer",player)
    })

    store.on('removePlayer')
    .subscribe((player) =>{
      socket.emit("removePlayer", player)
    })

    store.on('gameStatusChange')
    .subscribe((game) =>{
      
    })
    socket.emit('getPlayers',{})
  return store
}


module.exports = effects