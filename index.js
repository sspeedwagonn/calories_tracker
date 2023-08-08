const targetCalories = document.getElementById("calories");
const consumedCalories = document.getElementById("consume");
const amountOfCalories = document.getElementById("amount");
const currentCalories = document.getElementById("current");

currentCalories.innerHTML = 0;

let form = document.querySelector(".add");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let formdata = new FormData(this);
    let input = parseFloat(formdata.get("amount")); // Parse input to a number

    let currentCaloriesValue = parseFloat(currentCalories.innerHTML); // Parse existing value

    if (!isNaN(input)) { // Make sure input is a valid number
        let newCalories = currentCaloriesValue + input;
        currentCalories.innerHTML = newCalories.toFixed(2).replace(/\.00$/, ""); // Update with the sum
    }

    this.reset(); // Reset the form
});