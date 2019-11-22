import React, {useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './NavBar.js'
import { Box } from '@material-ui/core'
import Container from '@material-ui/core/Container';
import CurrentGame from '../pages/currentGame.js';
import NewPlayerForm from '../pages/NewPlayer.js';
import Players from '../pages/Players.js';

var io = require('socket.io-client')
var socket = io('http://localhost:5000');
socket.emit('getPlayers',{})

var Store = require('./datastores/dataStore')

const useStyles = makeStyles({});


export default function Headeer() {
    const classes = useStyles();
    const store = Store.useStore()
    const updatePlayers = (serverPlayers) =>{
        console.log("server Players", serverPlayers)
        var setPlayers = store.set('players')
        setPlayers(serverPlayers)
    }

    useEffect(()=>{
        socket.on('updatePlayers',updatePlayers)
        return ()=>{
            socket.removeEventListener('updatePlayers',updatePlayers)
        }
    })
    

    return (
        <div className="App">
            <div className="App">
                <CssBaseline />

                <NavBar />
                <main>

                    <Route exact path="/" >

                    </Route>
                    <Route path="/currentgame">
                        <CurrentGame />
                    </Route>
                    <Route path="/newgame">
                        <div>Create New Game Here</div>
                    </Route>
                    <Route path="/newplayer">
                        <NewPlayerForm />
                    </Route>
                    <Route path="/players">
                        <Players />
                    </Route>

                </main>
                <footer>
                </footer>
            </div>
        </div>
    )
}
