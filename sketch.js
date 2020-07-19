var canvas, backgroundImage;

var gameState;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runners, runner1, runner2, runner3, runner4;

var runner_1_img, runner_2_img, runner_3_img, runner_4_img;

var hurdle, hurdles, hurdleImg;

function preload() {
  runner_1_img = loadImage('images/Runner1.png');
  runner_2_img = loadImage('images/Runner2.png');
  runner_3_img = loadImage('images/Runner3.png');
  runner_4_img = loadImage('images/Runner4.png');
  hurdleImg = loadImage('images/hurdleImg.png');
}

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