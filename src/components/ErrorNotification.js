import React from 'react';
import {Snackbar, SnackbarContent, IconButton, Icon} from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import { classExpression } from '@babel/types';

const useStyles = makeStyles(theme => ({
    success:{
        backgroundColor: green[600]
    },
    icon:{
        fontSize: 20,    
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message:{
        display:'flex',
        alignItems:'center'
    }
}));


function ErrorNotification(props){
    const classes = useStyles()
    
    return (<Snackbar className={classes.success}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={6000}
      onClose={props.onClose}
      open={props.open}>
        <SnackbarContent
            onClose={props.onClose}
            className={classes.success}
            message={
                <span id="client-snackbar" className={classes.message}>
                  <CheckCircleIcon className={classes.icon} />
                  {props.message}
                </span>
              }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={props.onClose}>
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
        />

    </Snackbar>)
}

export default ErrorNotification