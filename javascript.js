// GLOBAL VARIABLES (puke)
let number1=0;
let number2=0;
let operation= "";

let decimalWasPressed = false;
let secondOpPressed = false;

let displayString = `${number1}`;
const displayScreen = document.querySelector(".screen");

// LISTENERS

// // Generic button click handler
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(handleInput(displayString, button.className));
        console.log(number1);
    });
});

function handleInput(displayStringInput, buttonName) {
    // Read in current display screen text content
    let displayStringArray = Array.from(displayStringInput);
    
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
            // If first input, clear "0" from display
            if (number1 == 0) {
                displayStringArray = [];
                displayString=displayStringArray;
                displayScreen.textContent=displayString;
            };

            // Add input to current display string
            displayStringArray.push(buttonName[0]);
            displayString=displayStringArray.join('');
            
            // Display input
            displayScreen.textContent=displayString;

            // Store input variable
            number1 = parseFloat(displayString);

            // Return button value
            return buttonName[0];
        
        // FUNCTIONAL INPUTS
        case "ac-button":
            // Clear display
            displayString="0";
            displayScreen.textContent=displayString;
            decimalWasPressed = false;
            secondOpPressed = false;

            // Set input variable to 0
            number1 = 0;
            break;
        case "del-button":
            // Handle decimal reset
            if (displayStringArray[displayStringArray.length-1] == ".") {
                decimalWasPressed = false;
            };

            // Remove last character of string
            let displayStringArrayDel = displayStringArray.splice(-1,1);

            // Update current display string
            displayString=displayStringArray.join('');
            displayScreen.textContent=displayString;

            // Store input variable
            number1 = parseFloat(displayString);
            break;
        
        // OPERATIONAL INPUTS
        case "plus-button":
            operation="add";
            detectSecondOpPress(secondOpPressed);
            break;
        case "minus-button":
            operation="subtract";
            detectSecondOpPress(secondOpPressed);
            break;
        case "mult-button":
            operation="multiply";
            detectSecondOpPress(secondOpPressed);
            break;
        case "div-button":
            operation="divide";
            detectSecondOpPress(secondOpPressed);
            break;
    };

};

function detectSecondOpPress (boolean) {
    // If first time pressed, do nothing and wait for second number
    // If pressed for second time, perform operation on self
    if (boolean) {
        operateOnNum(operation,number1,number2);
    } else {
        secondOpPressed = true;
        number2=number1;
    };
;}

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