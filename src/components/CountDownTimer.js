import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
       padding:"16px", 
    },
    status:{
        "vertical-align":"top"
    }
}));


export default function CountDownTimer({ name, avatar, completed }) {
    const classes = useStyles()
    const img_path = "/images/heros/"+avatar
    return (
        <Box m={2} >
            <Paper className={classes.root} align="left" >
                <img width="60px" src={img_path} pl={2} />
                <Box ml={2} className={classes.status} display="inline-block" width="80%">
                    <Typography variant="h5" component="h3">
                        {name}
                    </Typography>
                    <LinearProgress variant="determinate" value={completed} />
                </Box>
                
            </Paper>
        </Box>
    );
}


