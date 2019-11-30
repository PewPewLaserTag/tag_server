// import openSocket from 'socket.io-client';
var rxjs = require('rxjs')
var ops = require('rxjs/operators')



function effects(store) {

    store.on('newPlayer')
    .subscribe((player) =>{
        store.get('socket').emit("newPlayer",player)
    })

    store.on('removePlayer')
    .subscribe((player) =>{
      store.get('socket').emit("removePlayer", player)
    })

    store.get('socket').emit('getPlayers',{})
  return store
}


module.exports = effects