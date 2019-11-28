var undux = require('undux')
var effects = require('./effects')
var io = require('socket.io-client')
var socket = io(document.location.hostname+':5000');

var initialState = {
    players: [
    ],
    newPlayer:{},
    removePlayer:{},
    gameStatus:"stopped",
    gameStoreEvent:{},
    socket:socket
}

module.exports = undux.createConnectedStore(initialState, effects)