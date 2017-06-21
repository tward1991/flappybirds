// Create our 'main' state that will contain the game
var mainState = {
preload: function() {
//load the bird sprite and the pipe sprite
  game.load.image('bird', 'assets/bird.png');
  game.load.image)'pipe', 'assets/pipe.png');
},

create: function() {
 //Change the background colour of the game to blue - for now!
game.stage.backgroundcolour= '71c5cf';
  
//Set the physics system  
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
 //Display the bird at the position x=100 and y=245
  this.bird= game.add.sprite(100, 245, 'bird');
  
  //Add physics to the bird
  //Needed for: movement, gravity, collisions, etc.
  game.physics.arcade.enable(this.bird);
  
 //Add gravity to the bird to make it fall
  this.bird.body.gravity.y = 1000;
  
  //Call the 'jump' function when the spacebar is pressed
  var spaceBar = game.input.keyboard.addKey(
                 Phaser.Keyboard.SPACEBAR);
  spaceBAR.onDown.add(this.jump, this);
  
//Create an empty group
this.pipes = game.add.group();
  
  addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 

    // Automatically kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
},
},

update: function() {
// This function is called 60 times per second
//If the 'bird' is out of the screen (too high or too low)
//Call the 'restartGame' function
  if (this.bird.y < 0 || this.bird.y > 490)
      this.restartGame();
},
//Make the bird jump
  jump: function() {
    //Add a vertial velocity to the bird
    this.bird.body.velocity.y = -350;

};
//Restart the game 
  restartGame: function() {
  //Start the 'main' state, which restarts the game
  game.state.start('main');
// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
