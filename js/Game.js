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
    runner1.addImage("runner1", runner_1_img);
    runner1.scale = 0.5;
    runner2 = createSprite(200, 300, 20, 20);
    runner2.addImage("runner2", runner_2_img);
    runner2.scale = 0.7;
    runner3 = createSprite(200, 500, 20, 20);
    runner3.addImage("runner3", runner_3_img);
    runner3.scale = 0.3;
    runner4 = createSprite(200, 700, 20, 20);
    runner4.addImage("runner4", runner_4_img);
    runner4.scale = 0.4;
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
            hurdle = createSprite(runners[index-1].x - 200, runners[index-1].y, 30, 20);
            hurdle.life = 200;     
            hurdle.shapeColor = "Blue";
            hurdle.addImage("hurdle", hurdleImg);
            hurdle.scale = 0.2;
            
            hurdles[index-1] = hurdle;
        }

        if (index === player.index){
          runners[index - 1].shapeColor = "red";
          camera.position.x = runners[index - 1].x;
          
          if(keyIsDown(UP_ARROW) && player.index !== null) {
            runners[index - 1].y = runners[index - 1].y - 90;
          }

          
          if(hurdles[index-1] !== undefined && runners[index-1].isTouching(hurdles[index-1])){
            player.updateGameState(2);
            textSize(20);
            text("Game Over",  runners[index - 1].x - 100, runners[index - 1].y - 100);
          }  
          
          if(player.distance >= 8000) {
            textSize(20);
            text("Game Over",  runners[index - 1].x - 100, runners[index - 1].y - 100);
            player.updateGameState(2);
          }

        }
       
      }

    }

    if(player.index !== null && gameState !== 2){
        player.distance += 3;
    }

    drawSprites();
  }

  end() {
    player.distance += 0;
  }
}