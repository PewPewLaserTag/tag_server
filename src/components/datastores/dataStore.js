var undux = require('undux')
var effects = require('./effects')

var initialState = {
    players: [
    ],
    newPlayer:{},
    removePlayer:{}
}

module.exports = undux.createConnectedStore(initialState, effects)