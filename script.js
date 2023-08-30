let displayValue = '0';
let numberArray = [];
let operatorArray = [];

const buttons = document.querySelectorAll('.calc-button');

function updateDisplay() {
    displayValue = displayValue.toString();
    const display = document.querySelector('.display');
    if (displayValue.length > 13) {
        display.style = "font-size: 20px";
        display.textContent = displayValue;
    } else {
        display.style = "font-size: 50px";
        display.textContent = displayValue;
    }
};

updateDisplay();


function buttonClick() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            if (displayValue === '-' || displayValue === '+' || 
            displayValue === '*' || displayValue === '/') {
                displayValue = '';
            }
                if (buttons[i].classList.contains('operand')) {
                    checkDecimal();
                    inputOperand(buttons[i].value);
                } else if (buttons[i].classList.contains('operator')) {
                    inputOperator(buttons[i].value);
                } else if (buttons[i].classList.contains('equals')) {
                    operation();
                } else if (buttons[i].classList.contains('clear')) {
                    clear();
                } else if (buttons[i].classList.contains('delete')) {
                    deleteLast();
                } else if (buttons[i].classList.contains('negative')) {
                    switchNegative();
                }
                updateDisplay();
        });
    }
};

buttonClick();

function checkDecimal() {
    if (displayValue.toString().includes('.')) {
        document.getElementById('decimal').value = '';
    } else {
        document.getElementById('decimal').value = '.';
    }
};

function switchNegative() {
    if (displayValue.charAt(0) === '-') {
        displayValue = displayValue.substring(1);
    } else {
        displayValue = '-' + displayValue;
    }
}

function deleteLast() {
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
    displayValue = displayValue.substring(0, displayValue.length -1);
    updateDisplay();
    }
}

function clear() {
    displayValue = '0';
    numberArray.length = 0;
    operatorArray.length = 0;
}

function inputOperand(operand) {
    if (displayValue === '0') {
        displayValue = operand;
    } else {
        displayValue += operand;
    }
};

function inputOperator(operator) {
    numberArray.push(displayValue);
    operatorArray.push(operator);
    displayValue =  operator;
    updateDisplay();
}

function operation() {
    numberArray.push(displayValue)
    let currentTotal = 0;
    if (numberArray.length > 1) {
        for (let i = numberArray.length; i > 1; i--) {
            switch(operatorArray[0]) {
                case '-': currentTotal = 
                Number(numberArray[0]) - Number(numberArray[1]);
                    postOperationArray();
                    break;
                case '+': currentTotal = 
                Number(numberArray[0]) + Number(numberArray[1]);
                    postOperationArray();
                    break;
                case '*': currentTotal = 
                Number(numberArray[0]) * Number(numberArray[1]);
                    postOperationArray();
                    break;
                case '/': currentTotal = 
                Number(numberArray[0]) / Number(numberArray[1]);
                    postOperationArray();
                    break;
            }
            displayValue = currentTotal;
            updateDisplay();
        }
        numberArray.length = 0;
    } 
}

function postOperationArray(currentTotal) {
    operatorArray.splice(0, 1);
    numberArray.splice(0, 2);
    numberArray.unshift(currentTotal);
}