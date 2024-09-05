// GLOBAL VARIABLES (puke) GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
// Integers/floats/strings
let number1=0;      // Intended: float
let number2=0;      // Intended: float
let operation= "";  // Intended: string
let previousInput;  // Intended: string
let displayString = `${number1}`;

// Booleans
let calcAcPressed = true;
let decimalWasPressed = false;
let secondOpPressed = false;
let equalsPressed = false;

// Utility variables
let verboseLogging = true;

// Universal selectors
const displayScreen = document.querySelector(".screen");





// LISTENERS LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

// // Generic button click handler
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleInput(button.className)
    });
});

// // Generic keyboard handler
addEventListener("keydown", (key) => {
    switch (key.code) {
    case "Numpad0":
        handleInput("0-button");
        break;
    case "Numpad1":
        handleInput("1-button");
        break;
    case "Numpad2":
        handleInput("2-button");
        break;
    case "Numpad3":
        handleInput("3-button");
        break;
    case "Numpad4":
        handleInput("4-button");
        break;
    case "Numpad5":
        handleInput("5-button");
        break;
    case "Numpad6":
        handleInput("6-button");
        break;
    case "Numpad7":
        handleInput("7-button");
        break;
    case "Numpad8":
        handleInput("8-button");
        break;
    case "Numpad9":
        handleInput("9-button");
        break;
    case "NumpadDecimal":
        handleInput(".-button");
        break;
    case "NumpadEnter":
        handleInput("equals-button");
        break;
    case "NumpadAdd":
        handleInput("plus-button");
        break;
    case "NumpadSubtract":
        handleInput("minus-button");
        break;
    case "NumpadMultiply":
        handleInput("mult-button");
        break;
    case "NumpadDivide":
        handleInput("div-button");
        break;
    case "Delete":
        handleInput("ac-button");
        break;
    case "Backspace":
        handleInput("del-button");
        break;
    }
});


// FUNCTIONS FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF

// handleInput(buttonName)
// This function takes in an HTMLElement.Classname and either triggers
// a mathematical input handler or a display update
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

        // FUNCTION INPUTS
        case "ac-button":
            acReset();
            break;
        case "del-button":
            passInputToDisplay("delete", false, null)
            break;

        // OPERATOR INPUTS
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
        // // Integers, floats, and strings
        console.log("number1: " + number1);
        console.log("number2: " + number2);
        console.log("operation: " + operation);
        console.log("previousInput: " + previousInput);
        console.log("displayString: " + displayString);
        
        // // Booleans
        console.log("calcAcPressed: " + calcAcPressed);
        console.log("decimalWasPressed: " + decimalWasPressed);
    };
};



// acReset()
// This function quickly resets all flags, stored variables for 
// computation, and the calculator's display
function acReset () {
    // Clear flags
    calcAcPressed = true;
    decimalWasPressed = false;

    // Clear data
    number1 = 0;
    number2 = 0;
    operation = null;

    // Clear display
    passInputToDisplay("refresh", false, 0);

    // Clear inputs
    previousInput = null;
};



// passInputToDisplay(state, ignoreInput, input)
// This function takes one of three actions as specified by its state 
// parameter.  It will then either ignore the input passed to it or
// process that input for display.
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

            // Stop user from deleting a 0-length array's "final element"
            if (displayStringArray.length==1){
               displayStringArray = [0];
               calcAcPressed = true; 
            } else {
                displayStringArray.splice(-1,1);                // Delete most recent entry
            }
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



// parseInput(input)
// This function takes an input, either numeric, operational, or 
// utility, then provides action handling for that input. Strings 
// are continuously concatenated, unless interrupted by a utility or 
// operator input.
function parseInput(input) {
    let prevInputIsNotOperator = (previousInput >= 0 && previousInput <= 9 || previousInput == ".");    // [CONDITION] Previous input is not operator
    let inputIsNotOperator = (input >= 0 && input <= 9 || input == ".")                                 // [CONDITION] Current input is not operator
    let result;

    // Check current length of screen, and exit if too long
    if (displayString.length>9 && inputIsNotOperator) {
        alert("Too long!");
        acReset();
        return;
    }

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
                };
                                   
                previousInput = input;                              // Remember input for handling later
            };

        } else {
            // // If the previous input was an operation, and current input is a digit, create the new text string
            // // (AC and DEL are exempt from this condition)
            if (inputIsNotOperator) {
                passInputToDisplay("refresh", false, input);
                previousInput = input;
            
            // // If the previous input was an operation...
            } else {
                //... and current operation matches previous, then execute operation again
                if(input == previousInput || (!prevInputIsNotOperator && input == "execute")) {
                    if(number2 == 0) {
                        number2 = number1;
                    };
                    result = calculate(number1, number2, operation);
                    number1 = result;
                    passInputToDisplay("result", true, result);
                    previousInput = input;

                //... otherwise, wait for new string of numbers
                } else {
                    operation = input;
                };
            }; 
        };
    };
};



// calculate(input1, input2, operation)
// This function performs the basic "four-function" methods on any two 
// input numbers input1 and input2, as specified by parameter 
// operation.
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

// This line displays something on the screen when the page is refreshed.
displayScreen.textContent=displayString;