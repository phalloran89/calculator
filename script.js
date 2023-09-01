let mainDisplayValue = '0';
let secondaryDisplayValue = '';
let numberArray = [];
let operatorArray = [];
let secondaryArray = [];

const buttons = document.querySelectorAll('.calc-button');

function updateMainDisplay() {

    mainDisplayValue = mainDisplayValue.toString();
    const mainDisplay = document.querySelector('.mainDisplay');

    if (mainDisplayValue.length > 13) {
        mainDisplay.style = "font-size: 20px";
        mainDisplay.textContent = mainDisplayValue;
    } else {
        mainDisplay.style = "font-size: 50px";
        mainDisplay.textContent = mainDisplayValue;
    }
};

updateMainDisplay();

function updateSecondaryDisplay() {

    const secondaryDisplay = document.querySelector('.secondaryDisplay');
    let l = numberArray.length;

        for (i = 0; i < l; i++) {
            secondaryArray.push(numberArray[i], operatorArray[i]);
        }
        secondaryArray.push(...numberArray.slice(l),...operatorArray.slice(l));

        if (secondaryArray.length > 1) {
            secondaryDisplayValue = secondaryArray.join(' ') + `=`;
        }
    secondaryDisplay.textContent = secondaryDisplayValue;
};

updateSecondaryDisplay();

function buttonClick() {

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            buttonsEventListener([i]);
        });
    }
};

function buttonsEventListener([i]) {

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
    updateMainDisplay();
};

buttonClick();

function checkDecimal() {

    if (mainDisplayValue.toString().includes('.')) {
        document.getElementById('decimal').value = '';
    } else {
        document.getElementById('decimal').value = '.';
    }
};

function switchNegative() {

    if (mainDisplayValue.charAt(0) === '-') {
        mainDisplayValue = mainDisplayValue.substring(1);
    } else {
        mainDisplayValue = '-' + mainDisplayValue;
    }
};

function deleteLast() {

    if (mainDisplayValue.length === 1) {
        mainDisplayValue = '';
    } else {
        mainDisplayValue = 
        mainDisplayValue.substring(0, mainDisplayValue.length -1);
    }
};

function clear() {

    mainDisplayValue = '0';
    secondaryDisplayValue = '';
    secondaryArray.length = 0;
    numberArray.length = 0;
    operatorArray.length = 0;
    updateSecondaryDisplay();
};

function checkMainDisplayValue(mainDisplayValue) {

    if (mainDisplayValue === '-' || mainDisplayValue === '+' || 
        mainDisplayValue === '*' || mainDisplayValue === '/') {
            return true;
        }
};

function inputOperand(operand) {

    if (checkMainDisplayValue(mainDisplayValue) == true) {
        operatorArray.push(mainDisplayValue);
        mainDisplayValue = '';
    }
            
    if (mainDisplayValue === '0' || mainDisplayValue === '') {
        mainDisplayValue = operand;
    } else {
        mainDisplayValue += operand;
    }
};

function inputOperator(operator) {

    if (checkMainDisplayValue(mainDisplayValue) == true) {
        mainDisplayValue = operator;
    }
    
    if (mainDisplayValue.length >= 1 ) {
        numberArray.push(mainDisplayValue);
        mainDisplayValue = operator;
    } else {
        mainDisplayValue = operator;
    }
};

function operation() {

    numberArray.push(mainDisplayValue)
    updateSecondaryDisplay();
    secondaryArray.length = 0;
    let currentTotal = 0;

    if (numberArray.length > 1) {
        for (let i = numberArray.length; i > 1; i--) {
            operatorSwitch();            
        }
        numberArray.length = 0;
    }
};

function operatorSwitch() {

    switch(operatorArray[0]) {
        case '-': currentTotal = 
        Number(numberArray[0]) - Number(numberArray[1]);
            postOperationArray(currentTotal);
            break;
        case '+': currentTotal = 
        Number(numberArray[0]) + Number(numberArray[1]);
            postOperationArray(currentTotal);
            break;
        case '*': currentTotal = 
        Number(numberArray[0]) * Number(numberArray[1]);
            postOperationArray(currentTotal);
            break;
        case '/': currentTotal = 
        Number(numberArray[0]) / Number(numberArray[1]);
            postOperationArray(currentTotal);
            break;
    }
    mainDisplayValue = currentTotal;
};

function postOperationArray(currentTotal) {
   
    operatorArray.splice(0, 1);
    numberArray.splice(0, 2);
    numberArray.unshift(currentTotal);
};

// need to add keyboard functionality.

