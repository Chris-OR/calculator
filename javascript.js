let operator, input = "";
let toClear = false;
let toOperate = false;
let total = 0;

function add(num1, num2) {
    return (num1 + num2);
}

function subtract(num1, num2) {
    return (num1 - num2);
}


function multiply(num1, num2) {
    return (num1 * num2);
}


function divide(num1, num2) {
    if (num2 == "0") {
        return "0";
    }
    return (num1 / num2);
}

function operate(operator, num1, num2) {
    let value = 0;
    num1 = Number(num1);
    num2 = Number(num2);
    // console.log(operator, num1, num2);
    if (operator === "add") {
        total = add(num1, num2);
    } else if (operator === "subtract") {
        total = subtract(num1, num2);
    } else if (operator === "multiply") {
        total = multiply(num1, num2);
    } else if (operator === "divide") {
        total = divide(num1, num2);
    }
}

let result = "";
display = document.querySelector(".output");

numbers = document.querySelectorAll(".keypad button");
numbers.forEach(numberButton => {
    numberButton.addEventListener("click", function() {
        if (toClear) {
            toClear = false;
            toOperate = true;
            clearDisplay(false);
        }
        if (numberButton.innerText === ".") {
            if (!(result.includes("."))) {
                result += numberButton.innerText;
                display.innerText = result;
            }
        } else {
            result += numberButton.innerText;
            display.innerText = result;
        }
    });
});

// Update display for each keypress in the keypad
document.addEventListener("keypress", function(e) {
    if (!(isNaN(e.key)) | e.key === ".") {
        if (toClear) {
            toClear = false;
            toOperate = true;
            clearDisplay(false);
        }
        if (e.key === ".") {
            if (!(result.includes("."))) {
                result += e.key;
                display.innerText = result;
            }
        } else {
            result += e.key;
            display.innerText = result;
        }
    }
});

let enter = document.querySelector("#enter");

functions = document.querySelectorAll(".functions button");
functions.forEach(functionButton => {
    functionButton.addEventListener("click", function() {
        if (toOperate) {
            if (total != 0) {
                // console.log(total);
                operate(operator, total, display.innerText);
            } else {
                // console.log(total);
                operate(operator, input, display.innerText);
            }
            toOperate = false;
            if (functionButton.id === "equals") {
                display.innerText = total;
            }
        }

        input = display.innerText;
        operator = functionButton.id;
        toClear = true;
    });
});

// Add keypress support for function buttons
document.addEventListener("keypress", function(e) {
    if (e.key === "Enter" | e.key === "=" | e.key === "+" | e.key === "-" | e.key === "*" |e.key === "x" | e.key === "/") {
        if (toOperate) {
            if (total != 0) {
                operate(operator, total, display.innerText);
            } else {
                operate(operator, input, display.innerText);
            }
            toOperate = false;
            if (e.key === "=" || e.key === "Enter") {
                display.innerText = total;
            }
        }

        input = display.innerText;
        operator = getOperator(e.key);
        toClear = true;
    }
});

clear = document.querySelector("#clear");
clear.addEventListener("click", clearDisplay, true);

document.addEventListener("keypress", function(e) {
    if (e.key === "c") {
        clearDisplay(true);
    }
})

function clearDisplay(reset) {
    display.innerText = "0";
    result = "";
    if (reset) {
        total = 0;
    }
}

document.addEventListener('click', function (e) {
    if (e.target.tagName === "BUTTON") {
        if (document.querySelector(".clicked")) {
            document.querySelector(".clicked").classList.remove("clicked");
        }
        e.target.classList.add("clicked");
    }
})

document.addEventListener("keypress", function(e) {  
    // Alter opacity on keypad when button is types  
    buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        if (button.innerText === e.key | button.value === e.key) {
            if (document.querySelector(".clicked")) {
                document.querySelector(".clicked").classList.remove("clicked");
            }
            button.classList.add("clicked");
        }
    });
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Backspace") {
        result = result.substring(0, result.length - 1);
        if (result === "") {
            result = "0";
        }
        display.innerText = result;
    }
});

let deleteKey = document.querySelector("#delete");
deleteKey.addEventListener("click", function() {
    result = result.substring(0, result.length - 1);
    display.innerText = result;
});

function getOperator(key) {
    if (key === "+") {
        return "add";
    } else if (key === "-") {
        return "subtract";
    } else if (key === "x" | key === "*") {
        return "multiply";
    } else if (key === "/") {
        return "divide";
    }
}