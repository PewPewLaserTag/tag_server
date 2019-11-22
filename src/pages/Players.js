import React from 'react';
import CountDownTimer from '../components/CountDownTimer.js';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import PlayerCard from '../components/PlayerCard.js';
var Store = require("../components/datastores/dataStore")

const useStyles = makeStyles(theme => ({
    root: {
        padding: "16px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    status: {
        "vertical-align": "top"
    }
}));


function Players(props) {
    const classes = useStyles()
    const store = Store.useStore()
    const players = store.get('players')
    console.log(players)
    const playerList = players.map(function(player){
        return <PlayerCard key={player.name} name={player.name} avatar={player.avatar} completed={80}></PlayerCard>
    })
    return (
        <Container className={classes.root}>
            {playerList}
        </Container>
    );
}

export default Store.withStore(Players)