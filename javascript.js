// LISTENERS

// // Generic button click handler
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
    button.addEventListener("click", () => console.log(button.id));
});