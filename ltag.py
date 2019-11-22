import flask
from flask_socketio import SocketIO, send, emit,join_room, leave_room
from time import sleep
import logging
from tinydb import TinyDB, Query

from PlayerManager import Players, PlayerDoesNotExistsError

import eventlet
eventlet.monkey_patch()

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

p = Players()

APP = flask.Flask(__name__)
APP.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(APP, logger=True, cors_allowed_origins="*")

 
@APP.route('/')
def index():
    """Displays the index page"""
    return flask.render_template('index.html')

@APP.route('/t2')
def test_server():
    emit("My R  esponse","Wakey Wakey")
    return "test"

@APP.route('/scan')
def scan_gun():
    #/scan?id=123&color=red
    id = flask.request.args.get('id')
    color = flask.request.args.get('color')
    try:
        player = p.playerByTag(id)
        socketio.emit("scan", player)
    except PlayerDoesNotExistsError:
        socketio.emit("newScan", {"id":id, "color":color})
    return id

@socketio.on("getPlayer")
def getPlayer(tag):
    return p.playerByTag(tag)

@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)

@socketio.on('getPlayers')
def handle_getPlayers(json):
    print("getPlayers")
    print(p.allPlayers())
    emit('updatePlayers', p.allPlayers(), broadcast=True)

@socketio.on('newPlayer')
def handle_json(json):
    print('received newPlayer: ', json)
    p.newPlayer(json)
    emit('updatePlayers', p.allPlayers(), broadcast=True)
    #TODO handle the errors
    
@socketio.on('removePlayer')
def removePlayer(player):    
    print(player)
    p.removePlayer(player)
    emit('updatePlayers', p.allPlayers(), broadcast=True)
    #TODO handle the errors

@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))
    emit("My Response","Roger Roger:"+str(json))
    print("emitted")

@socketio.on("recover")
def handle_recover(json):
    emit("My Response","Loading", broadcast=True)

@socketio.on_error()
def error_handler(e):
    print('An error has occurred: ' + str(e))

@socketio.on('join')
def on_join(data):
    #username = data['username']
    room = 'laser_tag'
    join_room(room)
    send("Room Joined")

if __name__ == '__main__':
    APP.debug=True
    socketio.run(APP, host="0.0.0.0", port="5000")
