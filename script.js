let displayValue = '0';
let numberArray = [];
let operatorArray = [];

const buttons = document.querySelectorAll('.calc-button');

function updateDisplay() {
    const display = document.querySelector('.display');
    if (displayValue.length > 13) {
        display.style = "font-size: 20px";
        display.textContent = displayValue;
    } else {
        display.textContent = displayValue;
    }
};

updateDisplay();


function buttonClick() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            if (displayValue === '-' || displayValue === '+' || displayValue === '*' || displayValue === '/') {
                displayValue = '';
            }
            if (buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains('equals')) {
                operation();
                updateDisplay();
            } else if (buttons[i].classList.contains('clear')) {
                clear();
                updateDisplay();
            } else if (buttons[i].classList.contains('delete')) {
                deleteLast();
                updateDisplay();
            }
        });
    }
};

buttonClick();

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
                case '-': currentTotal = Number(numberArray[0]) - Number(numberArray[1]);
                    operatorArray.splice(0, 1);
                    numberArray.splice(0, 2);
                    numberArray.unshift(currentTotal);
                    break;
                case '+': currentTotal = Number(numberArray[0]) + Number(numberArray[1]);
                    operatorArray.splice(0, 1);
                    numberArray.splice(0, 2);
                    numberArray.unshift(currentTotal);
                    break;
                case '*': currentTotal = Number(numberArray[0]) * Number(numberArray[1]);
                    operatorArray.splice(0, 1);
                    numberArray.splice(0, 2);
                    numberArray.unshift(currentTotal);
                    break;
                case '/': currentTotal = Number(numberArray[0]) / Number(numberArray[1]);
                    operatorArray.splice(0, 1);
                    numberArray.splice(0, 2);
                    numberArray.unshift(currentTotal);
                    break;
            }
            displayValue = currentTotal;
            console.log(numberArray);
            console.log(operatorArray);
            updateDisplay();
        }
        numberArray.length = 0;
    } 
}
