//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)


//timer to make the game run at 60fps
var timer = setInterval(main, 1000 / 60)

//global friction variable
var fy = .97


//WEEK 2 - CREATING THE PLAYERS//

//1.Declare an array called Player
let player = [];

//WEEK 2 - SCOREBOARD 
const scores = document.querySelectorAll("#scoreText > span");


//2.Add a new Player() to the 0 and 1 indexes
player[0] = new Player(scores[0]);
player[1] = new Player(scores[1]);


//3.Give the players a paddle by setting the pad property to new Box();
player[0].pad = new Box();
player[1].pad = new Box();


//WEEK 2 - CREATING AN ARRAY FOR THE PADDLES//

//1.Add a new array called pad to the game
let pad = [player[0].pad, player[1].pad];
console.log(pad)
//2.store the player's avatar's in the pad array
//p1 setup
pad[0] = player[0].pad
pad[0].w = 20
pad[0].h = 150
pad[0].x = 0 + pad[0].w / 2
pad[0].color = 'green'

//p2 setup
pad[1] = player[1].pad
pad[1].w = 20
pad[1].h = 150
pad[1].x = c.width - pad[1].w / 2
pad[1].color = 'blue'

//ball setup
var ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -3
ball.vy = -3
ball.color = 'white'

//3.Change all paddle refrences to pad[0]/pad[1]


function main() {
    //erases the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //Loop through each paddle
    for (let i = 0; i < pad.length; i++) {
        // Player controls
        if (i === 0) { // Player 1
            if (keys[`w`]) pad[i].vy += -pad[i].force;
            if (keys[`s`]) pad[i].vy += pad[i].force;
        } else if (i === 1) { // Player 2
            if (keys[`o`]) pad[i].vy += -pad[i].force;
            if (keys[`p`]) pad[i].vy += pad[i].force;
        }


        //apply friction

        pad[i].vy *= fy;

        //Move the paddle
        pad[i].move();


        //Paddle collision with the canvas borders
        if (pad[i].y < 0 + pad[i].h / 2){
            pad[i].y = 0 + pad[i].h / 2;
        }
        if (pad[i].y > c.height - pad[i].h / 2) {
            pad[i].y = c.height - pad[i].h / 2;
        }


        // Ball collision with the paddles
        if (ball.collide(pad[i])) {
            if (i === 0) {
                ball.x = pad[i].x + pad[i].w / 2 + ball.w / 2;
            } else {
                ball.x = pad[i].x - pad[i].w / 2 - ball.w / 2;
            }
            ball.vx = -ball.vx;
        }

        //draw the paddle

        pad[i].draw();

    }

    //Ball movement

    ball.move();

    if (ball.y < 0) {
        ball.y = 0;
        ball.vy = -ball.vy;
    }

    if (ball.y > c.height) {
        ball.y = c.height;
        ball.vy = -ball.vy;
    }

    // ball goes out on left player 2 scored
    if (ball.x < 0) {
        player[1].score++;
        player[1].updateScore();
        ball.x = c.width / 2;
        ball.y = c.height / 2;
        ball.vx = -ball.vx;
    }

    // ball goes out on right player 1 scored


    if (ball.x >= c.width) {
        player[0].score++;
        player[0].updateScore();
        ball.x = c.width / 2;
        ball.y = c.height /  2;
        ball.vx = -ball.vx;
    }

      //draw the objects
    //   pad[0].draw();
    //   pad[1].draw();
      ball.draw();

}





    //ball collision 
    // if (ball.x < 0) {
    //     player[1].score++
    //     player[1].updateScore()
    //     ball.x = c.width / 2
    //     ball.y = c.height / 2
    // }

    // if (ball.x >= c.width) {
    //     player[0].score++
    //     player[0].updateScore()
    //     ball.x = c.width / 2
    //     ball.y = c.height / 2
    //     //ball.x = c.width
    //     ball.vx = -ball.vx
    // }

    // if (ball.y < 0) {
    //     ball.y = 0
    //     ball.vy = -ball.vy
    // }

    // if (ball.y > c.height) {
    //     ball.y = c.height
    //     ball.vy = -ball.vy
    // }

    // for (let i = 0; i < pad.length; i++) {
    //     if (ball.collide(pad[i])) {
    //         if (i === 0) {
    //             ball.x = pad[i].x + pad[i].w / 2 + ball.w / 2
    //         } else {
    //             ball.x = pad[i].x - pad[i].w / 2 - ball.w / 2
    //         }

    //         ball.vx = -ball.vx;
    //     }
    // }

    // p1 with ball collision
    // if (ball.collide(pad[0])) {
    //     ball.x = pad[0].x + pad[0].w / 2 + ball.w / 2
    //     ball.vx = -ball.vx;
    // }

    // //p2 with ball collision
    // if (ball.collide(pad[1])) {
    //     ball.x = pad[1].x - pad[1].w / 2 - ball.w / 2
    //     ball.vx = -ball.vx;

    // }


    //p1 accelerates when key is pressed 
    // if (keys[`w`]) {
    //     pad[0].vy += -pad[0].force
    // }

    // if (keys[`s`]) {
    //     pad[0].vy += pad[0].force
    // }
    // //p2 accelerates when key is pressed
    // if (keys[`o`]) {
    //     pad[1].vy += -pad[1].force
    // }

    // if (keys[`p`]) {
    //     pad[1].vy += pad[1].force
    // }


    // //applies friction
    // pad[0].vy *= fy;
    // pad[1].vy *= fy;

    //player movement
    // pad[0].move();
    // pad[1].move();




      // //p1 collision
    // if (pad[0].y < 0 + pad[0].h / 2) {
    //     pad[0].y = 0 + pad[0].h / 2
    // }
    // if (pad[0].y > c.height - pad[0].h / 2) {
    //     pad[0].y = c.height - pad[0].h / 2
    // }
    // //p2 collision 
    // if (pad[1].y < 0 + pad[1].h / 2) {
    //     pad[1].y = 0 + pad[1].h / 2
    // }
    // if (pad[1].y > c.height - pad[1].h / 2) {
    //     pad[1].y = c.height - pad[1].h / 2
    // }