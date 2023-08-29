let displayValue = '0';
let numberArray = [];

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
            if (buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
                updateDisplay();
            }
        });
    }
};

buttonClick();

function inputOperand(operand) {
    if (displayValue === '0') {
        displayValue = operand;
    } else {
        displayValue += operand;
    }
};

function inputOperator(operator) {
    numberArray.push(displayValue);
    displayValue =  operator;
    updateDisplay();
}