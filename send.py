import logging

import socketio
import time 

# standard Python
sio = socketio.Client()

sio.connect('http://localhost:5000')
sio.emit('recover', {'foo': 'bar'})
time.sleep(1)
sio.disconnect()