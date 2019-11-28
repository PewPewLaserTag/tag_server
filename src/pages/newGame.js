import React, { useState, useEffect } from 'react';
import { Container, Slider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'
var Store = require("../components/datastores/dataStore")

const useStyles = makeStyles(theme => ({
    root: {
        padding: "16px",
    },
    container: {
       marginTop:"32px"
    }
}));

function NewGame(props) {
    const classes = useStyles()
    const store = Store.useStore()
    const socket = store.get('socket')
    const valuetext = (value) => {
        return `${value} Seconds`;
    }
    return (
        <Container align="left">
            <form className={classes.contianer} noValidate autoComplete="off">
                <div>
                    <Slider
                        defaultValue={15}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={15}
                        marks
                        min={15}
                        max={150}
                    />
                </div>
            </form>
        </Container>
    )
}
export default Store.withStore(NewGame)