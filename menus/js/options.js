/*--------
    Make the Options Button 
    . on click
    . show or hide the `.sides` div
---------*/

let options_title = document.querySelector(`section#options > h2`)
let options = document.querySelector(`div.sides`) // .sides or div.sides

function when_h2_is_clicked() {
    options.classList.toggle("hidden")
    // actual logic that is happening on `toggle` :)
    // if (options.classList.contains("hidden")) {
    //     console.log("class list IS hidden, showing it")
    //     options.classList.remove("hidden")
    // } else {
    //     console.log("class list is SHOWING, hiding it")
    //     options.classList.add("hidden")
    // }
}

options_title.addEventListener(`click`, when_h2_is_clicked)
// options_title.addEventListener(`click`, () => options.classList.toggle("hidden")) another way of doing this
// options_title.addEventListener(`click`, () => {
//     options.classList.toggle("hidden")
// })


/*---------
    Program the two fill inputs to do the following:
    . Display the correct colors on the inputs and outputs and paddles    
    . using an `input` event
        . Change the player's fill property to the value of the input
        . Change the pad's fill property  to the player's fill property
        . Show the fill's hex code in the output div 


        
-----------*/

document.querySelectorAll(`.op`).forEach((player_settings, i) => {
    const outputs = player_settings.querySelectorAll(".output");
    const fill = player_settings.querySelector(".fill");
    const stroke = player_settings.querySelector(".stroke");

    fill.value = player[i].fill;
    stroke.value = player[i].stroke;

    outputs[0].innerHTML = fill.value;
    outputs[1].innerHTML = stroke.value;

    stroke.addEventListener(`input`, (e) => {
        player[i].pad.stroke = e.target.value;
        outputs[1].innerHTML = e.target.value;

    })

    fill.addEventListener(`input`, (e) => {
        player[i].pad.fill = e.target.value;
        outputs[0].innerHTML = e.target.value;
    })
});

/*---------
    Program the six key inputs to do the following:
    . Display the correct key names for each player   
    . using a `keydown` event
        .Display the correct key name in the input
        .Change the player's key to the value of the input
        .Show the player's key in the output div 
-----------*/

// Select all the "u" inputs
const uInputs = document.querySelectorAll('input.u');

// set the player's u key to equal the new value of the input

// Iterate through the inputs
uInputs.forEach((input, index) => {
    const player_item = player[index]; // Assuming first input is for player1, second for player2
    // const player = index === 0 ? players.player1 : players.player2;
    // teranary operator to figure out the correct player
    /* same thing as:
    if (index === 0) {
        player = players.player1
    } else {
        player = players.player2 
    }
    */

    // Set the input's value to the appropriate player's current 'u' key
    input.value = player_item.keys.u.toLowerCase();

    // Add a 'keydown' event listener
    input.addEventListener('keydown', (event) => {
        // Prevent default behavior to allow custom handling
        event.preventDefault();

        // Update the input value with the pressed key
        input.value = event.key;

        // Set the player's 'u' key to the new value
        player_item.keys.u = event.key.toLowerCase();

        // Display the player's new 'u' key value in the output
        const outputDiv = input.nextElementSibling;
        outputDiv.textContent = `New 'u' key: ${player_item.keys.u}`;
    });




    // Add a focus event listener to pause the game
    input.addEventListener('focus', () => {
        // Set game state to pause
        currentState = 'pause';
    });

    // code in the case that we wanted to have an event for unpausing
    // input.addEventListener('focusout', () => {
    //     // Set game state to pause
    //     currentState = 'game';
    // });
});

const dInputs = document.querySelectorAll('input.d');



dInputs.forEach((input, index) => {
    const player_item = player[index];


    input.value = player_item.keys.d.toLowerCase();

    input.addEventListener('keydown', (event) => {
        event.preventDefault();


        input.value = event.key;

        // Set the player's 'u' key to the new value
        player_item.keys.d = event.key.toLowerCase();

        // Display the player's new 'u' key value in the output
        const outputDiv = input.nextElementSibling;
        outputDiv.textContent = `New 'd' key: ${player_item.keys.d}`;
    });




    // Add a focus event listener to pause the game
    input.addEventListener('focus', () => {
        // Set game state to pause
        currentState = 'pause';
    });

    // code in the case that we wanted to have an event for unpausing
    // input.addEventListener('focusout', () => {
    //     // Set game state to pause
    //     currentState = 'game';
    // });
});

const ballSizeRange = document.querySelector('#ballSize');
ballSizeRange.value = o[2].w;

ballSizeRange.addEventListener("input", (e) => {
    const newSize = e.target.value;
    o[2].w = newSize;
    o[2].h = newSize;
});

const ballColor = document.querySelector(`.ball-color`);
ballColor.value = o[2].fill

ballColor.addEventListener(`input`, (e) =>{
    o[2].fill = e.target.value
    e.target.nextElementSibling.innerHTML = e.target.value;
});

// Iterate through the players
players.forEach(player => {
    console.log(`Iterating through ${player.name}`);

    // Iterate through the player's colors
    player.colors.forEach(color => {
        console.log(`Color: ${color}`);
    });

    // Iterate through the player's keys
    for (let key in player.keys) {
        console.log(`Key for ${key}: ${player.keys[key]}`);
    }
});



// const ball = {
//     radius: 20, // default value
//     // Other ball properties
// };

// ballSizeInput.addEventListener('input', function () {
//     ball.radius = parseInt(this.value);
//     // Update the ball's rendering on the canvas
//     // You'll need to adjust the drawing logic in your game loop to use ball.radius
// });

// // In your rendering function
// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
//     ctx.fillStyle = ball.fillColor; // Use existing color logic
//     ctx.fill();
//     ctx.strokeStyle = ball.strokeColor; // Use existing stroke logic
//     ctx.stroke();
//     ctx.closePath();
// }
