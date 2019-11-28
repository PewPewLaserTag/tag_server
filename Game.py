from tinydb import TinyDB, Query


class Game:
    def __init__(self):
        self.db = TinyDB('db.json')
        self.games = self.db.table("games")
        self.Game = Query()
    
    def newGame(self, gameType):
        """Creates a new game and returns the ID"""
        return self.games({
            "type": gameType
        })

    def getGame(self, id):
        """Returns a specific game """
        return self.games.get(doc_id=id)

    
    
