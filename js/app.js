// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Setting the Enemy initial location (you need to implement)
    this.x = x;
    this.y = y; //or 146, 229
    // the Enemy speed (you need to implement)
    this.speed = 10 + (Math.random() * 200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 600){
        this.x = -20;
    }
    return;
    //handle collision w player
    //if (this.x === player.x && this.y = player.y) {
        //restart game? or end game?
    //}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = "images/char-cat-girl.png";
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = 5 * dt;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 50;
    this.y = 300;
};

Player.prototype.handleInput= function(key) {
    switch (key){
        case 'left':
            this.x = this.x - 40;
            break;
        case 'right':
            this.x = this.x + 40;
            break;
        case 'up':
            this.y = this.y - 40;
            break;
        case 'down':
            this.y = this.y + 40;
            break;
    };
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-20,63);
var enemy2 = new Enemy(-20, 229);
var allEnemies = [];
var allEnemies = [enemy1, enemy2];
var player = new Player(202, 385);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //Recall that the player cannot move off screen 
    //(so you will need to check for that)
    //if (player.x > canvas.width || player.x < canvas.width || player.y > canvas.height || player.y < canvas.height) {
        //reset the game
    //};

    ///if (player reachers water the game) {relevant code doing good stuff}

    player.handleInput(allowedKeys[e.keyCode]);
});


    //If the player reaches the water the game should be reset 
    // by moving the player back to the initial location (you can write a separate reset Player method to handle that).
