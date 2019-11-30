import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography, Snackbar } from '@material-ui/core';
import AvatarSelector from '../components/AvatarSelector';
import IconAttribution from '../components/IconAttribution';
import Notification from '../components/Notification';

var Store = require('../components/datastores/dataStore')


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
    const socket = store.get('socket')
    const [selectedAvatar, setSelectedAvatar] = useState(0)
    const [name, setName] = useState("")
    const [tag, setTag] = useState("")
    const [notifyOpen, setNotifyOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [notify, setNotify] = useState()
    const getAvatar = (avatar) => {
        setSelectedAvatar(avatar)
    }

    const handleNameChange = (e) => setName(e.target.value)
    const handleTagChange = (e) => setTag(e.target.value)
    const handleSave = (e) => {
        store.set('newPlayer')({ "name": name, "avatar": selectedAvatar, "tag": tag })

    }

    const handleScan = (scan) => {
        setTag(scan['id'])
    }

    const handlePlayerAdded = (serverEvent) => {
        console.log("serverEvent", serverEvent)
        if(serverEvent.type == "success"){
            setMessage(serverEvent.message)
            setNotify(<Notification variant="success" message={serverEvent.message}></Notification>)
            setNotifyOpen(true)
            setName("")
            setTag("")
            setSelectedAvatar("")
        }
        else if (serverEvent.type == "error"){
            setNotify(<Notification variant="error" message={serverEvent.message}></Notification>)
            setNotifyOpen(true)
        }
        else{
            setNotify(<Notification variant="error" message="Well, that didn't work. Not sure why"></Notification>)
            setNotifyOpen(true)
        }
        
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotifyOpen(false)
    }

    useEffect(() => {
        socket.on('newScan', handleScan)
        socket.on('newPlayerAdded', handlePlayerAdded)
        socket.on('newPlayerError', handlePlayerAdded)
        return () => {
            socket.removeEventListener('newScan', handleScan)
            socket.removeEventListener('newPlayerAdded', handlePlayerAdded)
            socket.removeEventListener('newPlayerError', handlePlayerAdded)
        }
    })


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
                    <AvatarSelector onChange={getAvatar} value={selectedAvatar} />
                    <IconAttribution />
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={notifyOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                {notify}
            </Snackbar>

        </Container>
    );
}


export default Store.withStore(NewPlayerForm)