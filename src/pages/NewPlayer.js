import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import AvatarSelector from '../components/AvatarSelector';
import IconAttribution from '../components/IconAttribution';

var Store = require('../components/datastores/dataStore')

var io = require('socket.io-client')
var socket = io('http://localhost:5000');

const useStyles = makeStyles(theme => ({
    container: {
        textAlign: "left"
    },
    status: {
        "vertical-align": "top"
    }
}));


function NewPlayerForm() {
    const classes = useStyles()
    const store = Store.useStore()
    const [selectedAvatar, setSelectedAvatar] = useState(0)
    const [name, setName] = useState("")
    const [tag, setTag] = useState("")
    const getAvatar = (avatar) => {
        setSelectedAvatar(avatar)
    }
    const handleNameChange = (e) => setName(e.target.value)
    const handleTagChange = (e) => setTag(e.target.value)
    const handleSave = (e) => {
        console.log("Click", "Removing Player")
        store.set('newPlayer')({"name":name, "avatar":selectedAvatar, "tag":tag})
    }
    const handleScan = (scan) => {
        setTag(scan['id'])
    }
    
    useEffect(()=>{
        socket.on('newScan',handleScan)
        return ()=>{
            socket.removeEventListener('newScan',handleScan)
        }
    })

    console.log(name)
    return (
        <Container align="left">
            <form className={classes.contianer} noValidate autoComplete="off">
                <div>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        className={classes.textField}
                        label="Name"
                        margin="normal"
                        onChange={handleNameChange}
                        value={name}
                    />
                </div>
                <div>
                    <AvatarSelector onChange={getAvatar} />
                   <IconAttribution/>
                </div>
                <div>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        className={classes.textField}
                        label="Tag Number"
                        margin="normal"
                        onChange={handleTagChange}
                        value={tag}
                    />

                </div>
                <Button onClick={handleSave}>
                    Save
                </Button>

            </form>
        </Container>
    );
}


export default Store.withStore(NewPlayerForm)