import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './components/NavBar.js'
import { Box } from '@material-ui/core'
import Container from '@material-ui/core/Container';
import CurrentGame from './pages/currentGame.js';
import NewPlayerForm from './pages/NewPlayer.js';
import LaserTag from './components/LaserTag.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
var Store = require('./components/datastores/dataStore')


function App() {
  return (
    <Store.Container>
      <Router>
        <LaserTag>

        </LaserTag>
      </Router>
    </Store.Container>
  );
}

export default App;
