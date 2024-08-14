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
    
    fill.value = player[i].fill;
    outputs[0].innerHTML = fill.value;

    fill.addEventListener(`input`, (e) => {
        player[i].pad.fill = e.target.value;
        outputs[0].innerHTML = e.target.value;
    })
})

/*---------
    Program the six key inputs to do the following:
    . Display the correct key names for each player   
    . using a `keydown` event
        .Display the correct key name in the input
        .Change the player's key to the value of the input
        .Show the player's key in the output div 
-----------*/
