//Create our 'main' state that will contain the game
var mainState = {
	preload: function() {
		//This function will be executed at the beginning
		//That's where we load the images and sound
		
		//Load the bird sprite
		game.load.image('bird', 'assets/bird.png');
		game.load.image('pipe', 'assets/pipe.png');
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
