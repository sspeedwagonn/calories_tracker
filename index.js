const currentCalories = document.getElementById("current");
const caloriesAvailable = document.getElementById("available");
const logContainer = document.getElementById("log");

let targetCaloriesValue = 0;
let consumedItems = [];

currentCalories.innerHTML = "0";
caloriesAvailable.innerHTML = "0";

let calForm = document.querySelector(".calories");

calForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let availForm = new FormData(this);
    let availInput = parseFloat(availForm.get("calories"));

    if (!isNaN(availInput)) {
        targetCaloriesValue = availInput;
        caloriesAvailable.innerHTML = targetCaloriesValue.toFixed(0);
    }

    this.reset();
});

let form = document.querySelector(".add");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let formdata = new FormData(this);
    let item = formdata.get("consume");
    let input = parseFloat(formdata.get("amount"));

    let currentCaloriesValue = parseFloat(currentCalories.innerHTML);
    let availableCaloriesValue = parseFloat(caloriesAvailable.innerHTML);

    if (!isNaN(input)) {
        let newCalories = currentCaloriesValue + input;
        currentCalories.innerHTML = newCalories.toFixed(2).replace(/\.00$/, "");

        let newAvailableCalories = availableCaloriesValue - input;
        if (newAvailableCalories >= 0) {
            caloriesAvailable.innerHTML = newAvailableCalories.toFixed(0);
        } else {
            caloriesAvailable.innerHTML = "0";
        }

        consumedItems.push({ item, calories: input });
        updateLog();
    }

    this.reset();
});

function updateLog() {
    logContainer.innerHTML = "";
    consumedItems.forEach((item, index) => {
        let logItem = document.createElement("div");
        logItem.classList.add("log-item");
        logItem.innerHTML = `<strong>${item.item}</strong> - ${item.calories.toFixed(0)} calories`;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editItem(index));
        logItem.appendChild(editButton);

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeItem(index, item.calories));
        logItem.appendChild(removeButton);

        logContainer.appendChild(logItem);
    });
}

function editItem(index) {
    let newCalories = parseFloat(prompt("Enter new calories for this item:"));
    if (!isNaN(newCalories) && newCalories >= 0) {
        consumedItems[index].calories = newCalories;
        updateLog();
        updateCalories();
    }
}

function removeItem(index, calories) {
    consumedItems.splice(index, 1);
    updateLog();
    updateCalories(calories);
}

function updateCalories(removedCalories = 0) {
    let totalCalories = consumedItems.reduce((total, item) => total + item.calories, 0);
    let currentCaloriesValue = totalCalories;

    let availableCaloriesValue = targetCaloriesValue - totalCalories;
    if (availableCaloriesValue < 0) {
        availableCaloriesValue = 0;
    }

    currentCalories.innerHTML = currentCaloriesValue.toFixed(2).replace(/\.00$/, "");
    caloriesAvailable.innerHTML = availableCaloriesValue.toFixed(0);
}

updateLog();
