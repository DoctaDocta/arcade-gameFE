
//**** Helper functions *****//
function rangeCheck(p1,p2){
    if(p2>p1-30.5 && p2<p1+30.5){   // rangecheck for collisions
        return true;
    }
};

function randomYPos(){
    var yPositions = [60,149,226,60];
    var randomY = yPositions[Math.ceil(Math.random()*yPositions.length)];
     return randomY;  //generate random Y positioning
 };

function randomXPos(){
    var xPositions = [-30, -60, -90, -120, -150];
    var randomX = xPositions[Math.ceil(Math.random()*xPositions.length)];
   return randomX;
};
//*************************//

// Global Variables //
var successCount = 0;
var collisionCount = 0;
var collisionState = false;
//******************//


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
    //this.speed = this.speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    while(collisionState){    //handle collision w player
        player.reset();
        if (collisionCount === 1){
            alert("You have been eaten for the " + collisionCount + "st time!");
        } 
        else if (collisionCount === 2){
            alert("You have been eaten for the " + collisionCount + "nd time!");
        }
        else if (collisionCount=== 3){
            alert("You have been eaten for the " + collisionCount + "rd time!");
        }
        else if (collisionCount >= 4){
            alert("You have been eaten for the " + collisionCount + "th time!");
        }
        collisionState = false;
    };
    
    this.speed = this.x + (Math.random() * 300 * dt);
    this.x = this.speed; // this deals with the speed
                        // do it in update so it acts as a function of dt

    if (this.x > 505){ //reset enemy to left of screen @ random position
        this.x = randomXPos();
        this.y = randomYPos();
    };

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
    if (this.y < 10){
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
// Now instantiate your objects.
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
});