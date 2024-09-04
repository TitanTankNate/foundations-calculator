// GLOBAL VARIABLES (puke)
let displayString = "";
let decimalWasPressed = false;
const displayScreen = document.querySelector(".screen");

// LISTENERS

// // Generic button click handler
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(updateDisplay(displayString, button.className));
    });
});

function updateDisplay(displayStringInput, buttonName) {
    // Read in current display screen text content
    const displayStringArray = Array.from(displayStringInput);
    
    // Input handler
    switch (buttonName) {
        // Numeric inputs
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
            // Add input to current display string
            displayStringArray.push(buttonName[0]);
            displayString=displayStringArray.join('');
            displayScreen.textContent=displayString;

            // Return button value
            return buttonName[0];
        case "ac-button":
            displayString="";
            displayScreen.textContent=displayString;
            decimalWasPressed = false;
    };

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