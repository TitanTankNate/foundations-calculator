// GLOBAL VARIABLES (puke)
let number1=0;
let number2=0;
let operation= "";
let previousInput;

let calcAcPressed = true;
let decimalWasPressed = false;
let secondOpPressed = false;
let equalsPressed = false;

let verboseLogging = true;

let displayString = `${number1}`;
const displayScreen = document.querySelector(".screen");

// LISTENERS

// // Generic button click handler
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleInput(button.className)
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
            // Clear flags
            calcAcPressed = true;
            decimalWasPressed = false;

            // Clear data
            number1 = 0;
            number2 = 0;

            // Clear display
            passInputToDisplay("refresh", false, 0);

            // Clear inputs
            previousInput = null;
            break;
        case "del-button":
            passInputToDisplay("delete", false, null)
            break;
        case "plus-button":
            parseInput("add");
            break;
        case "minus-button":
            parseInput("subtract");
            break;
        case "mult-button":
            parseInput("multiply");
            break;
        case "div-button":
            parseInput("divide");
            break;
        case "equals-button":
            parseInput("execute");
            break;
    };

    // VERBOSE LOGGING
    if (verboseLogging) {
        console.clear();
        console.log("number1: " + number1);
        console.log("number2: " + number2);
        console.log("operation: " + operation);
        console.log("previousInput: " + previousInput);
        
        console.log("calcAcPressed: " + calcAcPressed);
        console.log("decimalWasPressed: " + decimalWasPressed);
        
        console.log("displayString: " + displayString);
    };
};



function passInputToDisplay(state, ignoreInput, input) {
    let displayStringArray = Array.from(displayString);         // Create an array for holding text input
    const displayScreen = document.querySelector(".screen");    // Reference "display screen"
    
    // If refreshState is true, clear the array
    switch (state) {
        case "refresh":
            displayStringArray = [];                            // Clear the 0 from the string
            break;
        case "delete":
            // Clear decimalWasPressed flag if decimal is deleted
            if (displayStringArray[displayStringArray.length-1] == ".") {
                decimalWasPressed = false;
            };
            displayStringArray.splice(-1,1);                    // Delete most recent entry
            break;
        case "result":
            displayStringArray = Array.from(`${input}`);
            break;
        default:
    }
    
    // If ignoreInput is true, do not push input keys to display
    if (!ignoreInput) {
        displayStringArray.push(input);                         // Add input to array
    }

    displayString = displayStringArray.join('');                // Create text string for display purposes
    displayScreen.textContent = displayString;                  // Change text content to updated string
};



function parseInput(input) {
    let prevInputIsNotOperator = (previousInput >= 0 && previousInput <= 9 || previousInput == ".");    // [CONDITION] Previous input is not operator
    let inputIsNotOperator = (input >= 0 && input <= 9 || input == ".")                                 // [CONDITION] Current input is not operator
    let result;

    // Take input and...
    // // If it is the first input after a refresh, clear the display and create a string.
    if (calcAcPressed) {
        // Only perform this operation if the new input is a digit
        if (inputIsNotOperator) {
            calcAcPressed = false;                                  // Clear refresh state
            passInputToDisplay("refresh", false, input);                 // Pass input to display
            previousInput = input;                                  // Remember input for handling later
        };
        // Do nothing if the user presses an operator on a blank screen                          
        
    } else {
        // // If the previous input was a digit, and current input is a digit, continue the string
        if (prevInputIsNotOperator) {
            if (inputIsNotOperator) {
                passInputToDisplay(null, false, input);             // Pass input to display
                previousInput = input;                              // Remember input for handling later
            
            // // If the previous input was a digit, and current input is an operation, cls and remember operation
            } else {
                decimalWasPressed = false;                          // Allow decimal use again

                // If the current input is "equals", execute math, otherwise store number and operation
                if (input == "execute") {
                    number2 = parseFloat(displayString);
                    result = calculate(number1, number2, operation);
                    number1 = result;
                    passInputToDisplay("result", true, result);
                } else {
                    if (number1 != 0) {
                        number2 = parseFloat(displayString);
                        result = calculate(number1, number2, operation);
                        number1 = result;
                        passInputToDisplay("result", true, result);
                    };
                    operation = input;
                    number1 = parseFloat(displayString);
                    
                    // number1 = parseFloat(displayString);
                    //passInputToDisplay("refresh", true, input);     // Pass input to display   
                };
                                   
                previousInput = input;                              // Remember input for handling later
            };

        } else {
            // // If the previous input was an operation, and current input is a digit, create the new text string
            // // (AC and DEL are exempt from this condition)
            if (inputIsNotOperator) {
                passInputToDisplay("refresh", false, input);
                previousInput = input;
            
            // // If the previous input was an operation, and current input is an operation, perform the operation
            // // on the already-existing number
            } else {
                if(operation == "execute") {
                    operation = input;
                };

                if(previousInput == "execute" && input != "execute") {
                    
                    previousInput = input;
                    operation = input;
                    // passInputToDisplay("refresh", true, input);
                } else {
                    result = calculate(number1, number2, operation);
                    number1 = result;
                    passInputToDisplay("result", true, result);
                };
            } 
        };
    };


};



function calculate (input1, input2, operation) {
    switch (operation) {
        case "add":
            return input1 + input2;
        case "subtract":
            return input1 - input2;
        case "multiply":
            return input1 * input2;
        case "divide":
            return input1 / input2;
    }
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