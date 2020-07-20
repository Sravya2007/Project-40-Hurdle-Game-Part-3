class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.gameState = 0;
    this.rank = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = 'players/player' + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  updateGameState(gameStatePassed){
    var playerIndex = 'players/player' + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,      
      gameState: gameStatePassed
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getRunnersAtEnd() {
    database.ref('runnersAtEnd').on("value",(data)=>{
      this.rank = data.val();
    });
  }

  static updateRunnersAtEnd(rank) {
    database.ref('/').update({
      runnersAtEnd : rank
    })
  }
}
