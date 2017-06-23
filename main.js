//Create our 'main' state that will contain the game
var mainState = {
	preload: function() {
		//This function will be executed at the beginning
		//That's where we load the images and sound
		
		//Load the bird sprite
		game.load.image('bird', 'assets/which1.png');
		game.load.image('pipe', 'assets/sweet.png');
		game.load.audio('jump', 'assests/jump.wav');
	},
	
	create: function() {
		//This function is called after the preload function
		//Here we setup the game, display sprites, etc.
		
		//Change the background colour of the game to blue - for now!
		game.stage.backgroundColor = '#000000';
		
		//Set the physics for the game
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//Display the bird at the position of x=100 and y=245
		this.bird = game.add.sprite(100, 245, 'bird');
		
		//Add the physics to the bird
		//Needed for: movement, gravity, collisions, etc.
		game.physics.arcade.enable(this.bird);
		
		//Add gravity to the bird to make it fall
		this.bird.body.gravity.y = 1000;
		
		//Call 'jump' function when the spacebar is pressed
		var spaceBar = game.input.keyboard.addKey(
						Phaser.Keyboard.SPACEBAR);
		spaceBar.onDown.add(this.jump, this);
		
		//Create an empty group
		this.pipes = game.add.group();
		
		//Timer for pipes
		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
		
		//Score
		this.score= -1;
		this.labelScore = game.add.text(20, 20, "0",
						{font: "30px Arial", fill: "#ffffff" });	
		//Add the sound to the game 
		this.jumpsound = game.add.audio('jump');
	},
	
	update: function() {
		//This function is called 60 times per second
		//It contains the games logic
		
		//Call the 'restartGame' function
		if (this.bird.y <0 || this.bird.y > 490)
			this.restartGame();
		
		//calls the restartGame function each time the bird dies 
		game.physics.arcade.overlap(
			this.bird, this.pipes, this.hitpipe, null, this);
		
		//Slowly rotate the bird downward, up to a certain point
		if (this.bird.angle < 20)
			this.bird.angle +=1;
	},
	
	jump: function() {
		//Stops the bird being controlled when it is dead. Dead means dead
		if (this.bird.alive == false)
			return;
		
		//Add a vertical velocity to the bird
		this.bird.body.velocity.y = -350;
		//Create an animation on the bird 
		var animation = game.add.tween(this.bird);
		
		//Change the angle of the bird to -20 in 100 milliseconds
		animation.to({angle: -20}, 100);
		
		//And start the animation
		animation.start();
		
		//Play sound
		this.jumpSound.play();
		
		
	},
	
	hitpipe: function() {
	// If the bird has already hit a pipe, do nothing 
	// It means the bird is already falling off the screen	
          if (this.bird.alive == false)
		  return;
		
	//Set the alive property of the bird to false 
         this.bird.alive = false;
		
	//Prevent new pipes from appearing 
	game.time.events.remove(this.timer);
		
        //Go through all the pipes, and stop their movement
	this.pipes.forEach(function(p){	
		p.body.velocity.x = 0;
	},this);
	},	
		
	
	//Restart the game
	restartGame: function() {
		//Start the 'main' state, which restarts the game
	game.state.start('main');
	},
	
	//Add a pipe
	addOnePipe: function(x, y) {
		//Create a pipe at the position x and y
		var pipe = game.add.sprite(x, y, 'pipe');
		
		//Add pipe to group
		this.pipes.add(pipe);
		
		//Enable the physics on the pipe
		game.physics.arcade.enable(pipe);
		
		//Add velocity to the pipe to make it move left
		pipe.body.velocity.x = -200;
		
		//Automatically kill pipe when it is not longer visible
		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;
	},
	
	//Many pipes
	addRowOfPipes: function() {
		//Randomly pick a number between 1 and 5
		//This will be the hole position in the pipe
		var hole = Math.floor(Math.random() * 5) + 1;
		
		//Add 6 pipes
		for (var i = 0; i < 8; i++)
			if (i != hole && i != hole +1)
				this.addOnePipe(400, i * 60 + 10);
		//Increases score as new pipes are created 
		this.score += 1;
		this.labelScore.text = this.score;
	},
};

//Initialise Phaser, and create a 400px x 490px game
var game = new Phaser.Game(400, 490);

//Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

//Start the state to actually start the game
game.state.start('main');	
		
