let numberArray = [];
let firstNum = numberArray[0];
let secondNum = numberArray[1];
operatorArray = [];
let operator = operatorArray[0];
let displayValue = '0';

const screen = document.querySelector('.screen');
screen.textContent = `${displayValue}`;

// C button click resets displayValue to 0 and clears numberArray and operatorArray.

document.querySelector('#clear').addEventListener('click', () => {
    console.log('CLEAR');
});

// delete button click removes last char from displayValue string.

document.querySelector('#delete').addEventListener('click', () => {
    console.log('DELETE');
});

// number button click adds number to the end of displayValue string.

document.querySelectorAll('.calc-button-num').forEach(item => {
    item.addEventListener('click', (event) => {
        const clickedNumber = event.target.textContent;
        if (displayValue === '0') {
            displayValue = clickedNumber;
        } else {
            displayValue += clickedNumber;
        }
        screen.textContent = displayValue;
    });
});

// operator button click converts displayValue string to a number and pushes it to numberArray, also adds operator to operatorArray.

document.querySelectorAll('.operator').forEach(item => {
    item.addEventListener('click', (event) => {
        console.log(`${event.target.textContent}`)
    });
});

// equals button runs operate function, which takes first two numbers from numberArray and first operator from operatorArray and does the operation, removes numbers and operator from arrays, sets currentTotal which is pushed to the index[0] of numberArray. If there are no more numbers in numberArray or operators in operatorArray it displays this number as displayValue.

document.querySelector('#equals').addEventListener('click', () => {
    console.log(`EQUALS`);
});