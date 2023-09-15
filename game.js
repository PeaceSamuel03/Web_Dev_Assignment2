let canvas;
let context;
let xhttp;
let request_id;
let audio = new Audio("static/sound.mp3");
document.getElementById("sound");

let fpsInterval = 1000 / 30
let now;
let then = Date.now();

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;
let fight = false;

let score = 500; // starts at 500 increases to win, decreases to lose


let mouse = {
    size : 3,
    eX : 0,
    eY : 0,
};

let pirate = {
    x : 200,
    y : 200,
    width : 24,
    height : 32,
    speed : 5,
    frameX : 0,
    frameY : 2
};

let bullet = {
    x : 10,
    y : 10,
    size : 3,
    velocity_x : 1,

};

let pirateIMAGE = new Image();
let enemyIMAGE = new Image();
let backgroundIMAGE= new Image();

let enemies = [];


document.addEventListener("DOMContentLoaded", init, false); 

function init(){
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d"); 

    // event listeners
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    window.addEventListener("mousedown", fighting, false);
    window.addEventListener("mouseup",not_fighting, false);

    pirateIMAGE.src = "static/pirate.png";
    enemyIMAGE.src = "static/enemy.png";
    backgroundIMAGE.src = "static/tiles24.png";
    audio.src = "static/sound.mp3";
    
    

   draw();
   audio.play();
  
}

function draw() {
    audio.play();
    // draw function draws on the canvas
    request_id = window.requestAnimationFrame(draw); 
    let now = Date.now();
    let elapsed = now -then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw background on the canvas 32x32 boxes
    context.drawImage(backgroundIMAGE,0,0,128,32,0,0,128,32);
    context.drawImage(backgroundIMAGE,0,0,128,32,0,32,128,32);
    context.drawImage(backgroundIMAGE,0,0,128,32,0,64,128,32);
    context.drawImage(backgroundIMAGE,0,0,128,32,0,96,128,32);
    context.drawImage(backgroundIMAGE,0,0,128,32,0,128,128,32);
    context.drawImage(backgroundIMAGE,0,0,128,32,0,160,128,32);
    context.drawImage(backgroundIMAGE,0,0,128,32,0,192,128,32);
    context.drawImage(backgroundIMAGE,0,0,128,32,0,224,128,32);
    context.drawImage(backgroundIMAGE,0,0,128,32,0,256,128,32);
    context.drawImage(backgroundIMAGE,0,0,128,32,0,288,128,32);
    
    context.drawImage(backgroundIMAGE,7*32,4*32,32,32,128,0,32,32);
    context.drawImage(backgroundIMAGE,3*32,5*32,32,32,128,32,32,32);
    context.drawImage(backgroundIMAGE,3*32,5*32,32,32,128,64,32,32);
    context.drawImage(backgroundIMAGE,3*32,5*32,32,32,128,96,32,32);
    context.drawImage(backgroundIMAGE,6*32,4*32,32,32,128,128,32,32);
    context.drawImage(backgroundIMAGE,0*32,0*32,32,32,128,160,32,32);
    context.drawImage(backgroundIMAGE,7*32,4*32,32,32,128,192,32,32);
    context.drawImage(backgroundIMAGE,3*32,5*32,32,32,128,224,32,32);
    context.drawImage(backgroundIMAGE,6*32,4*32,32,32,128,256,32,32);
    context.drawImage(backgroundIMAGE,7*32,4*32,32,32,128,288,32,32);

    context.drawImage(backgroundIMAGE,0*32,5*32,32,32,160,0,32,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,160,32,32,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,160,64,32,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,160,96,32,32);
    context.drawImage(backgroundIMAGE,6*32,5*32,32,32,160,128,32,32);
    context.drawImage(backgroundIMAGE,6*32,4*32,32,32,160,160,32,32);
    context.drawImage(backgroundIMAGE,0*32,5*32,32,32,160,192,32,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,160,224,32,32);
    context.drawImage(backgroundIMAGE,6*32,5*32,32,32,160,256,32,32);
    context.drawImage(backgroundIMAGE,7*32,5*32,32,32,160,288,32,32);

    context.drawImage(backgroundIMAGE,0*32,5*32,32,32,192,0,32,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,192,32,32,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,192,64,32,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,192,96,32,64);
    context.drawImage(backgroundIMAGE,2*32,5*32,32,32,192,160,32,32);
    context.drawImage(backgroundIMAGE,0*32,5*32,32,32,192,192,32,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,192,224,32,96);

    context.drawImage(backgroundIMAGE,0*32,5*32,32,32,224,0,72,32);
    context.drawImage(backgroundIMAGE,0*32,5*32,32,32,296,0,72,32);
    context.drawImage(backgroundIMAGE,0*32,5*32,32,32,368,0,72,32);
    context.drawImage(backgroundIMAGE,0*32,5*32,32,32,440,0,32,32);
    context.drawImage(backgroundIMAGE,7*32,5*32,32,32,472,0,40,32);

    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,224,32,144,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,368,32,144,32);

    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,224,64,144,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,368,64,144,32);

    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,224,96,144,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,368,96,144,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,224,128,144,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,368,128,144,32);

    context.drawImage(backgroundIMAGE,6*32,5*32,32,32,224,160,32,32);
    context.drawImage(backgroundIMAGE,7*32,5*32,32,32,224,192,32,32);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,224,224,32,128);

    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,256,160,144,192);
    context.drawImage(backgroundIMAGE,0*32,4*32,32,32,400,160,144,192);

    // draw pirate character
    context.drawImage(pirateIMAGE,
        pirate.frameX * pirate.width, pirate.frameY * pirate.height, pirate.width, pirate.height,
        pirate.x, pirate.y, pirate.width, pirate.height);
    
    // handle the movement keys
    if (moveRight) {
        pirate.x = pirate.x + pirate.speed;
        pirate.frameY = 1;
        pirate.frameX = 0;
    }
    if (moveLeft) {
        pirate.x = pirate.x - pirate.speed;
        pirate.frameY = 3;
        pirate.frameX = 0;
    }
    if (moveUp) {
        pirate.y = pirate.y - pirate.speed;
        pirate.frameY = 0;
        pirate.frameX = 0;
    }
    if (moveDown) {
        pirate.y = pirate.y + pirate.speed;
        pirate.frameY = 2;
        pirate.frameX = 0;
    }

    // prevent pirate from going out of bounds
    if (pirate.x < 144) {
        pirate.x = 144;
    } else if ( pirate.x + pirate.width >= canvas.width) {
        pirate.x = canvas.width - pirate.width;
    }
    if (pirate.y < 0) {
        pirate.y = 0.01;
    } else if (pirate.y + pirate.height >= canvas.height) {
        pirate.y = canvas.height - pirate.height;
    }
    // draw dot at point of pirate,move towards the end of the canvas(shoot), increase in x coordinate
    if (fight) {
        bullet.x = pirate.x;
        bullet.y = pirate.y;
        animate();
    }
    
    // draw enemies 
    if (enemies.length < 5) {
        let e = {
            x : randint(144, canvas.width),
            y : randint(0, canvas.height),
            width : 24,
            height : 32,
            frameX : 1,
            frameY : 2,
            xChange : randint(-1, -0.25),
            yChange : randint(-1,-0.25)
        };
        enemies.push(e);
    }
    
    for (let e of enemies) {
        context.drawImage(enemyIMAGE,
            e.frameX * e.width, e.frameY * e.height, e.width, e.height,
            e.x, e.y, e.width, e.height);

    }
    // allow enemies to move randomly[within bounds]
    for (let e of enemies) {
        e.x = e.x + e.xChange;
        e.y = e.y + e.yChange;
        if (e.x < 144) {
            e.xChange = e.xChange * -1;
        } else if ( e.x + e.width >= canvas.width) {
            e.xChange = e.xChange * -1;
        }
        if (e.y < 0) {
            e.yChange = e.yChange * -1;
        } else if ( e.y + e.height >= canvas.height) {
            e.yChange = e.yChange * -1;
        }
    }

    //collision of bullet with enemies
    for (let e of enemies) {
        if (enemy_collides(e)) {
            score = score + 200;
            enemies.splice(e);
        }
    }

    // collision with the enemies reduces score
    for (let e of enemies) {
        if (player_collides(e)) {
            score = score - 10;
            return;
        } else if (score <= 0) {
            stop("Game Over");
            return; 
        } else if (score >= 1000) {
            stop("You've won!!")
        }
    }
}

// continuously animate the bullet
function animate() {
    window.requestAnimationFrame(animate);
    bullet.x = bullet.x + bullet.velocity_x;
    context.fillStyle = "red";
    context.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
}



function randint(min,max){
    return Math.round(Math.random() * (max - min)) + min;
}

function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    }
}

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    }
}

function fighting(event){
    fight = true;
    mouse.eX = event.clientX ;
    mouse.eY = event.clientY ;
}

function not_fighting(event){
    fight = false;
    mouse.eX = event.clientX ;
    mouse.eY = event.clientY ;
};

 function player_collides(e) {
    if (pirate.x + pirate.width < e.x ||
        e.x + e.width < pirate.x ||
        pirate.y > e.y + e.height || 
        e.y > pirate.y + pirate.height) {
            return false;
        } else {
            return true;
        }
}

function enemy_collides(e) {
    if (e.x + e.width < bullet.x ||
        bullet.x + bullet.size < e.x||
        e.y > bullet.y + bullet.size||
        bullet.y > e.y + e.height) {
            return false;
        } else {
            return true;
        }

}

function stop(outcome) {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.removeEventListener("click", fighting, false);
    window.cancelAnimationFrame(request_id);
    let outcome_element = document.querySelector("#outcome");
    outcome_element.innerHTML = outcome;

    let data = new FormData();
    data.append("score",score);

    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_response, false);
    xhttp.open("POST", "/store_score", true);
    xhttp.send(data);
}


function handle_response() {
    //check that the response has fully arrived
    if (xhttp.readyState === 4) {
        //check the request was successful
        if (xhttp.status === 200) {
            if (xhttp.responseText === "success") {
                //score was successfully stored in database
            } else {
                // score was not successfully stored in database
            }
            
        }
    }
}




// add music
