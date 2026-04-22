const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let shouldResetDisplay = false;

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (shouldResetDisplay) {
        currentOperand = number;
        shouldResetDisplay = false;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case 'add':
            computation = prev + current;
            break;
        case 'subtract':
            computation = prev - current;
            break;
        case 'multiply':
            computation = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                computation = "Error";
            } else {
                computation = prev / current;
            }
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.value) {
            appendNumber(button.dataset.value);
            updateDisplay();
        } else if (button.dataset.action) {
            const action = button.dataset.action;
            if (action === 'clear') {
                clear();
                updateDisplay();
            } else if (action === 'delete') {
                deleteNumber();
                updateDisplay();
            } else if (action === 'calculate') {
                compute();
                updateDisplay();
                shouldResetDisplay = true;
            } else if (action === 'percent') {
                 if (currentOperand === '') return;
                 currentOperand = (parseFloat(currentOperand) / 100).toString();
                 updateDisplay();
                 shouldResetDisplay = true;
            } else {
                chooseOperation(action);
            }
        }
    });
});

function updateDisplay() {
    if (currentOperand === '') {
        display.innerText = '0';
    } else {
        if (!isNaN(currentOperand) && currentOperand !== "Error") {
             const num = parseFloat(currentOperand);
             // handle js floating point weirdness and long decimals
             const formattedNum = Number.isInteger(num) ? num.toString() : parseFloat(num.toFixed(10)).toString();
             display.innerText = formattedNum;
        } else {
             display.innerText = currentOperand;
        }
    }
}
