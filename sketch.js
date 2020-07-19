var canvas, backgroundImage;

var gameState;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runners, runner1, runner2, runner3, runner4;

var hurdle, hurdles;

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game(); 
  game.start(); 
}

function draw(){
  if(player.index !== null){
    game.getState(player.index); 
    if(playerCount === 4 && gameState !== 2){   
      player.updateGameState(1); 
      
      Player.getPlayerInfo();    
      
        for(var plr in allPlayers){
          game.getState(player.index);     

          if(gameState === 1){
            clear();
            game.play();
          }     
          
          if(gameState === 2) {
            game.end();
          }         
        }
    }

  }

}