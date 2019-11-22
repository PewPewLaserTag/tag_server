import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';




export default function Headeer() {
  const useStyles = makeStyles({
      root:{
          color:"lightgray",
          '& a':{
              color:"lightgray"
          } 
      }
  });
  
  const classes = useStyles();
  return (
    <div className={classes.root}> Icons made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> from www.flaticon.com</div>
  )
}


