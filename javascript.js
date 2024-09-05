// GLOBAL VARIABLES (puke)
let number1=0;
let number2=0;
let operation= "";
let previousInput;

let calcAcPressed = true;
let decimalWasPressed = false;
let secondOpPressed = false;
let equalsPressed = false;

let displayString = `${number1}`;
const displayScreen = document.querySelector(".screen");

// LISTENERS

// // Generic button click handler
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleInput(button.className)
        //console.log(handleInput(displayString, button.className));
        //console.log(number1);
    });
});



function handleInput(buttonName) {
    // Input handler
    switch (buttonName) {
        // NUMERIC INPUTS
        case ".-button":
            if (decimalWasPressed) {
                break;
            } else {
                decimalWasPressed = true;
            };
        case "1-button":
        case "2-button":
        case "3-button":
        case "4-button":
        case "5-button":
        case "6-button":
        case "7-button":
        case "8-button":
        case "9-button":
        case "0-button":
            parseInput(buttonName[0]);
            break;
        case "ac-button":
        case "del-button":
        case "plus-button":
            parseInput("plus");
        case "minus-button":
        case "mult-button":
        case "div-button":
    };

};



function passInputToDisplay(refreshState, ignoreInput, input) {
    let displayStringArray = Array.from(displayString);         // Create an array for holding text input
    const displayScreen = document.querySelector(".screen");    // Reference "display screen"
    
    // If refreshState is true, clear the array
    if (refreshState) {
        displayStringArray = [];                                // Clear the 0 from the string
    }
    
    // If ignoreInput is true, do not push input keys to display
    if (!ignoreInput) {
        displayStringArray.push(input);                         // Add input to array
    }

    displayString = displayStringArray.join('');                // Create text string for display purposes
    displayScreen.textContent = displayString;                  // Change text content to updated string
};



function parseInput(input) {
    // let displayStringArray = Array.from(displayString);         // Create an array for holding text input
    // const displayScreen = document.querySelector(".screen");    // Reference "display screen"

    // Take input and...
    // // If it is the first input after a refresh, clear the display and create a string.
    if (calcAcPressed) {
        calcAcPressed = false;                                  // Clear refresh state
        passInputToDisplay(true, false, input);                 // Pass input to display
        previousInput = input;                                  // Remember input for handling later
        
    } else {
        // // If the previous input was a digit, and current input is a digit, continue the string
        let condition1 = (previousInput >= 0 && previousInput <= 9 || previousInput == ".");    // Previous input
        let condition2 = (input >= 0 && input <= 9 || input == ".")                             // Current input
        if (condition1) {
            if (condition2) {
                passInputToDisplay(false, false, input);            // Pass input to display
                previousInput = input;                              // Remember input for handling later
            
            // // If the previous input was a digit, and current input is an operation, cls and remember operation
            } else {
                decimalWasPressed = false;                          // Allow decimal use again
                passInputToDisplay(true, true, input);              // Pass input to display
                operation = input;                                  // Remember input for handling later
            };

        // // If the previous input was an operation, and current input is a digit, create the new text string
        // // (AC and DEL are exempt from this condition)
        } else {
            if (!(previousInput == "delete" || previousInput == "AC")) {

            };
            
            
        };
    };


};



function operateOnNum(operation,firstInput,secondInput=0) {
    let result;
    switch (operation) {
        case "add":
            result = firstInput + secondInput;
            break;
        case "subtract":
            result = firstInput - secondInput;
            break;
        case "multiply":
            result = firstInput * secondInput;
            break;
        case "divide":
            result = firstInput / secondInput;
            break;

    }
    // Clear display
    displayString=result;
    displayScreen.textContent=displayString;
    decimalWasPressed = false;
    number1 = result;
};

// MAIN PROGRAM LOOP
displayScreen.textContent=displayString;



// Accept user input
// Store input into either
// // numeric variable, or
// // operator variable
// Display that input on the "display"
// First operator press
// // When operator is pressed, either 
// // 1) wait for number to perform operation, or
// // 2) execute operation if button pressed again
// // // Example:   2 followed by plus waits for another number
// // //            2 followed by plus plus adds 2 to 2
// Handle sequential inputs
// // Pressing any operator displays intermediate result of operation