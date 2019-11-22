from tinydb import TinyDB, Query


class Players:
    def __init__(self):
        self.db = TinyDB('db.json')
        self.players = self.db.table("players")
        self.Q = Query()

    def newPlayer(self, player):
        if "name" in player.keys():
            if self._player_exists(player['name'], player['tag']):
                raise PlayerExistsError(player)
            else:
                newPlayer = {
                    "name": str(player['name']),
                    "avatar": str(player['avatar']),
                    "tag": str(player['tag'])
                }
                print(newPlayer)
                self.players.insert(newPlayer)
            return self.allPlayers()
    
    def removePlayer(self, player):
        """Remove a player from the Database"""
        if "name" in player.keys():
            if self._player_exists(player['name'], player['tag']):
                self.players.remove(self.Q.name == player['name'])
            else:
                raise PlayerDoesNotExistsError(player)
            
    def playerByTag(self, tag):
        """Find a player by their Blaster Tag"""
        p = self.players.search(self.Q.tag == tag)
        if len(p) > 0:
            return p[0]
        else: 
            raise PlayerDoesNotExistsError(tag)


    def allPlayers(self):
        return self.players.all()

    def _player_exists(self, name, tag):
        results = self.players.search(self.Q.name == name or self.Q.tag == tag)
        if len(results) == 0:
            return False
        else:
            return True


class PlayerExistsError(Exception):
    def __init__(self, player):
        Exception.__init__(self, player)
        self.player = player
        self.message = f"Player:{player['name']} already in system"

class PlayerDoesNotExistsError(Exception):
    def __init__(self, player):
        Exception.__init__(self, player)
        self.player = player
        self.message = f"Player is no longer in the system: {player}"
