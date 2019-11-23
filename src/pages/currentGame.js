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

    //Using tick to trigger a render update
    const [tick, setTick] = useState(0)
    const players = store.get('players')
    const [outPlayers, setOutPlayers] = useState([])
    const handleScan = (scan) => {
        scan['remainingTime'] = 120
        scan['done'] = false
        outPlayers.push(scan)
        setOutPlayers(Array.from(outPlayers))
    }

    useEffect(() => {
        socket.on('scan', handleScan)
        const interval = setInterval(() => {

            for (const p of outPlayers) {

                if (p.remainingTime >= 0) {
                    p.remainingTime = p.remainingTime - 1
                }
                else {
                    p.done = true
                }
            }
            const outPlayersNew = outPlayers.filter((item)=>{
                return item.done != true
            })
            setOutPlayers(outPlayersNew)
            var t = tick
            if(tick > 10)
                t = 1
            setTick(t+1)
        }, 500)
        return () => {
            socket.removeEventListener('scan', handleScan)
            clearInterval(interval)
        }
    }, [outPlayers,tick])
    return (
        <Container>
            {outPlayers.map(player => {
                return <CountDownTimer name={player.name} key={player.name} avatar={player.avatar} completed={player.remainingTime / 120 * 100}></CountDownTimer>
            })}
        </Container>
    );
}

export default Store.withStore(CurrentGame)