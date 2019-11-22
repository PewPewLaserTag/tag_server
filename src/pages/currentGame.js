import React, { useState, useEffect } from 'react';
import CountDownTimer from '../components/CountDownTimer.js';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
var Store = require("../components/datastores/dataStore")
var io = require('socket.io-client')
var socket = io('http://localhost:5000');

const useStyles = makeStyles(theme => ({
    root: {
        padding: "16px",
    },
    status: {
        "vertical-align": "top"
    }
}));


function CurrentGame(props) {
    const classes = useStyles()
    const store = Store.useStore()
    const players = store.get('players')
    const [outPlayers, setOutPlayers] = useState([])
    console.log("outside",outPlayers)
    const handleScan = (scan) => {
        outPlayers.push(scan)
        setOutPlayers(Array.from(outPlayers))
    }

    useEffect(() => {
        socket.on('scan', handleScan)
        return () => {
            socket.removeEventListener('scan', handleScan)
        }
    })


    return (
        <Container>
            {outPlayers.map(player => {
                return <CountDownTimer name={player.name} key={player.name} avatar={player.avatar} completed={80}></CountDownTimer>
            })}
        </Container>
    );
}

export default Store.withStore(CurrentGame)