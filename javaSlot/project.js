// 1. Deposit some money
// 2. Determine number of lines
// 3. Colect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
//6. Give the user their winnings
//7. play again

//function is a reusable block of code that when called will execute something

//in js 'function' must be declared before the name
//() can hold any arguments and parameters you want the function to handle

// }

//1.imports/library
//2.global varibale
//3.classes/functions
//4.main line/aspects of program

const prompt = require("prompt-sync")();

const ROWS = 3; 
const COLS = 3;

const SYMBOLS_COUNT = { //KEY (A) //MAP = VALUE (2)
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOL_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
}



//FUNCTION FOR WHAT USER HAS DEPOSITED
const deposit = () => {
    while (true) { //while true = forever  
        const depositAmount = prompt("Enter a deposit amount: "); 
        const numberDepositAmount = parseFloat(depositAmount); //convert to integer because we will be adding and subtracting from it

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again."); //isNan is similar to IsDigit and checks if something is a digit
        } else { //otherwise 
            return numberDepositAmount; //if number IS an integer it will be returned to the deposit function call below 
        }
        
    }
};

//GET NUMBER OF LINES THEY WANT TO BET ON AND COLLECT BET
const getNumberOfLines = () => {
    while (true) { //while true = forever  
        const lines = prompt("Enter the number of lines to bet on (1-3): "); 
        const numberOfLines = parseFloat(lines); //convert to integer because we will be adding and subtracting from it

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3 ) //if not digit try again. if number of lines less than or equal to 0 try again. if number of lines greater than 3 try again
        {
            console.log("Invalid number of lines, try again."); //isNan is similar to IsDigit and checks if something is a digit
        } else { //otherwise 
            return numberOfLines; //if number IS an integer it will be returned to the deposit function call below 
        }
        
    }

};

const getBet = (balance, lines) => {
    while (true) { //while true = forever  
        const bet = prompt("Enter the bet per line: "); 
        const numberBet = parseFloat(bet); //convert to integer because we will be adding and subtracting from it

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) //if not digit try again. if number of lines less than or equal to 0 try again. if number of lines greater than 3 try again
        {
            console.log("Invalid bet, try again."); //isNan is similar to IsDigit and checks if something is a digit
        } else { //otherwise 
            return numberBet; //if number IS an integer it will be returned to the deposit function call below 
        }
        
    }

};

const spin = () => {
    const symbols = []; //an array is a reference data type. You can manipulate whats inside the array without changing the refrence to the array
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        //console.log(symbol, count);
        for (let i =0; i < count; i++){
            symbols.push(symbol); //push symbol into array. will just add how many symbols you have *push = append* how you insert an element into an array
        }

    }
   // console.log(symbols);

    const reels = []; //an array inside an array 
    for (let i = 0; i < COLS; i++){ //while i is less than # of columns keep looping soon as its equal or greater to it will stop. i++ increment - everytime we complete loop once, increment variable i by one allowing it to keep looping and keepig track  
        reels.push([])
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];  
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
        }   

    }
    
    return reels;
};


const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++){
        rows.push([])
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])

        }
    }

    return rows;
};


const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol 
            if (i != row.length - 1) {
                rowString += " | "
                
            }
        }
        console.log(rowString)
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]] 
        }
    }

    return winnings;
};

const game = () => {
    let balance = deposit(); //let allows you to adjust the value  of the variable

    while (true) {
        console.log("You have a balance of $" + balance);  
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines; 
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log ("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again? (y/n)? ")

        if (playAgain != "y") break;
    }
};


game() ;



