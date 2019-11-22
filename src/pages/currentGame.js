import React from 'react';
import CountDownTimer from '../components/CountDownTimer.js';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
var Store = require("../components/datastores/dataStore")

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
    const playerList = players.map(function(player){
        return <CountDownTimer name={player.name} avatar={player.avatar} completed={80}></CountDownTimer>
    })
    return (
        <Container>
            {playerList}
        </Container>
    );
}

export default Store.withStore(CurrentGame)