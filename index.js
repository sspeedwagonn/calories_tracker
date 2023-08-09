const currentCalories = document.getElementById("current");
const caloriesAvailable = document.getElementById("available");

currentCalories.innerHTML = 0;

let form = document.querySelector(".add");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let formdata = new FormData(this);
    let input = parseFloat(formdata.get("amount"));

    let currentCaloriesValue = parseFloat(currentCalories.innerHTML);

    if (!isNaN(input)) {
        let newCalories = currentCaloriesValue + input;
        currentCalories.innerHTML = newCalories.toFixed(2).replace(/\.00$/, "");
    }

    this.reset();
});

let calForm = document.querySelector(".calories");

calForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let availForm = new FormData(this);
    let availInput = parseFloat(availForm.get("calories"));

    if (!isNaN(availInput)) {
        let availCalData = availInput;
        caloriesAvailable.innerHTML = availInput.toFixed(2).replace(/\.00$/, "");
    }

    this.reset();
});

