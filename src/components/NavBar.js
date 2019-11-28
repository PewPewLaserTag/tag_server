import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AdjustIcon from '@material-ui/icons/Adjust';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CountDownTimer from './CountDownTimer';
import {Link as RouterLink} from "react-router-dom";
var Store = require("../components/datastores/dataStore")

const drawerWidth = 240;

const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const store = Store.useStore()
  const gameStatus = store.get('gameStatus')
  
  const socket = store.get('socket')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePlayGame = () =>{
    if(gameStatus == "playing")
      socket.emit("updateGameStatus",{"status":"paused"})
    else
      {
        socket.emit("updateGameStatus",{"status":"paused"})}
    console.log("Handle Play")
    handleDrawerClose()
    
  }

  const handleUpdateStatus = (e)=>{
    console.log(e)
    store.set('gameStatus',e['status'])
  }

  useEffect(()=>{
    socket.on('gameStatusUpdate',handleUpdateStatus)
    return () =>{
      socket.removeEventListener('gameStatusUpdate',handleUpdateStatus)
    }
  }) 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Laser Tag
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="StartGame" onClick={handlePlayGame}>
            <ListItemIcon><PlayCircleFilledIcon /></ListItemIcon>
            <ListItemText primary="Start Game" />
          </ListItem>
          <ListItem button key="StopGame" onClick={handleDrawerClose}>
            <ListItemIcon><StopIcon /></ListItemIcon>
            <ListItemText primary="Stop Game" />
          </ListItem>
          <Divider />
          <ListItem button key="NewGame" component={RouterLink} to="/newgame" onClick={handleDrawerClose}>
              <ListItemIcon><AddCircleIcon /></ListItemIcon>
              <ListItemText primary="New Game" />
          </ListItem>
          <ListItem button key="CurrentGame" component={RouterLink} to="/currentgame" onClick={handleDrawerClose}>
            <ListItemIcon><AdjustIcon /></ListItemIcon>
            <ListItemText primary="Current Game" />
          </ListItem>
          <Divider />
          <ListItem button key="AddPlayer" component={RouterLink} to="/newplayer" onClick={handleDrawerClose}>
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary="Add Player" />
          </ListItem>
          <ListItem button key="Players" component={RouterLink} to="/players" onClick={handleDrawerClose}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="All Players" />
          </ListItem>
        </List>

      </Drawer>

    </div>
  );
}
