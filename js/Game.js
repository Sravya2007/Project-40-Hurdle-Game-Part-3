class Game {
  constructor(){

  }

  getState(indexPassed){
    var gameStateRef  = database.ref('players/player'+ indexPassed + '/gameState');
    
    gameStateRef.on("value",(data)=>{
       gameState = data.val();
    })

  }

  async start(){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    
    runner1 = createSprite(200, 100, 20, 20);
    runner2 = createSprite(200, 300, 20, 20);
    runner3 = createSprite(200, 500, 20, 20);
    runner4 = createSprite(200, 700, 20, 20);
    
    runners = [runner1, runner2, runner3, runner4];
    
    hurdles = [];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){

      var index = 0;

      var y = 50;
      var x;

      for(var plr in allPlayers){
        index = index + 1;

        y = y + 200;

        x = displayWidth - allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;

        if(frameCount % 60 === 0) {
            hurdle = createSprite(runners[index-1].x - 200, runners[index-1].y, 40, 30);
            hurdle.life = 200;     
            hurdle.shapeColor = "Blue";
            
            hurdles[index-1] = hurdle;
        }

        if (index === player.index){
          runners[index - 1].shapeColor = "red";
          camera.position.x = runners[index - 1].x;
          
          if(keyIsDown(UP_ARROW) && player.index !== null) {
            runners[index - 1].y = runners[index - 1].y - 70;
          }

          
          if(hurdles[index-1] !== undefined && runners[index-1].isTouching(hurdles[index-1])){
            player.updateGameState(2);
          }          

        }
       
      }

    }

    if(player.index !== null){
        player.distance += 3;
    }

    if(player.distance >= 8000) {
      gameState = 2;
    }

    drawSprites();
  }

  end() {
    player.distance += 0;
    textSize(20);
    text("Game Over", displayWidth/2 - 50, displayHeight/3);
  }
}