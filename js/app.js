
//**** Helper functions *****//
function rangeCheck(p1,p2){
	if(p2>p1-30.5 && p2<p1+30.5){// rangecheck for collisions
		return true;
	}
}

// modified the code from another user's project which can be found here:
//https://github.com/adityagorti/arcade-game/blob/master/js/app.js

// the next two functions allocate locations for the enemies to spawn
// once they cross the screen towards the right.
function randomYPos(){
	var yPositions = [60,149,226,60];
	var randomY = yPositions[Math.floor(Math.random()*yPositions.length)];
	return randomY;//generate random Y positioning
}

function randomXPos(){
	var xPositions = [-30, -60, -90, -120];
	var randomX = xPositions[Math.floor(Math.random()*xPositions.length)];
	return randomX;
}
//*************************//

// Global Variables //
var successCount = 0;
var collisionCount = 0;
var collisionState = false;
//******************//


// Enemy class, and update and render methods.
var Enemy = function(x,y) {
	this.sprite = 'images/enemy-bug.png';//add multiple image functionality
	this.x = x;
	this.y = y;
	// the Enemy speed, x, and y are  implemented in enemy.update below...
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
	while(collisionState){//handle collision w player
		player.reset();
		successCount--;
		if (collisionCount === 1){
			alert("You have been eaten for the " + collisionCount + "st time!\nScore: " + successCount);
		}
		else if (collisionCount === 2){
			alert("You have been eaten for the " + collisionCount + "nd time!\nScore: " + successCount);
		}
		else if (collisionCount=== 3){
			alert("You have been eaten for the " + collisionCount + "rd time!\nScore: " + successCount);
		}
		else if (collisionCount >= 4){
			alert("You have been eaten for the " + collisionCount + "th time!\nScore: " + successCount);
		}
		collisionState = false;
	};
	this.speed = this.x + (Math.random() * 300 * dt);
	this.x = this.speed; // this deals with the speed
						// do it in update so it acts as a function of dt

	if (this.x > 505){ //reset enemy to left of screen @ 'random' position
		this.x = randomXPos();
		this.y = randomYPos();
	}

	if (rangeCheck(player.y, this.y) && rangeCheck(player.x, this.x)){
		collisionCount++;
		collisionState = true;
	};

	return collisionCount;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(x,y) {
	this.sprite = "images/char-cat-girl.png";
	this.x = x;
	this.y = y;
};

Player.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
//this.speed = 20 + (Math.random() * 200) * dt;
	this.x = this.x;
	this.y = this.y;
	if (this.y < 10){ //player has crossed the road and reached water
		successCount++;
		alert("Phew! you made it!\nScore: " + successCount);
		player.reset();
	}
	return successCount;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
	this.x = 202;
	this.y = 375;
};

// the handleinput function moves the player based on rows and columns
// defined in the enginer.js file.
// it also handles the boundaries of the htmlcanvas, player cant escape
Player.prototype.handleInput= function(key) {
	switch (key){
		case 'left':
			if (this.x > 0){
				this.x = this.x - 101;};
			break;
		case 'right':
			if (this.x < 404){
				this.x = this.x + 101;};
			break;
		case 'up':
			this.y = this.y - 83;
			break;
		case 'down':
			if (this.y < 375){
				this.y = this.y + 83;};
			break;
		};

};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
})

		//***** Game State *****//
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies[0] = new Enemy(-30,60);
allEnemies[1] = new Enemy(-100, 226);
allEnemies[2] = new Enemy(-40, 143);
allEnemies[3] = new Enemy(-300, 143);
allEnemies[4] = new Enemy(-30, 226);
allEnemies[5] = new Enemy(-180, 60);
var player = new Player(202, 375);
		//*******************//

