import React from 'react';
import { Card, CardContent, CardActions, Button, Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'
var Store = require("../components/datastores/dataStore")

const useStyles = makeStyles(theme => ({
    card: {
        minWidth:"200px",
        width: "275px",
        margin:"16px"
    },
    action:{
        justifyContent:"center"
    },
    status: {
        "vertical-align": "top"
    }
}));


function PlayerCard({ name, avatar, completed }) {
    const classes = useStyles()
    const img_path = "/images/heros/" + avatar
    const store = Store.useStore()
    const handleSave = (name,e) => {
        store.set('removePlayer')({"name":name})
    }
    return (
        <Card className={classes.card} raised="true">
            <CardContent>
                <img width="60px" src={img_path} pl={2} />
                <Typography variant="h5" component="h3">
                    {name}
                </Typography>
            </CardContent>
            <CardActions className={classes.action}>
                <Button size="large">Edit</Button><Button onClick={handleSave.bind(this,name)} size="large">Remove</Button>
            </CardActions>
        </Card>
    );
}

export default Store.withStore(PlayerCard)