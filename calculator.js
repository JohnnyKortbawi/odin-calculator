
let num1, num2 ,operator, result;

const calculatorDisplay = document.querySelector('#calculator-display');
clear();

const numericButtons = document.querySelectorAll('.numeric-button');
numericButtons.forEach((numericButton) => {
  numericButton.addEventListener('click', () => displayNumber(event.target.innerHTML));
});

const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => displayOperator(event.target.innerHTML));
});

const equalButton = document.querySelector('#button-equal');
equalButton.addEventListener('click', () => {calculate();})

const clearButton = document.querySelector('#button-clear');
clearButton.addEventListener('click', () => {clear();})

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function displayNumber(numericCharacter) {
  calculatorDisplay.textContent += numericCharacter;
}

function displayOperator(operator) {
  if(isNumeric(calculatorDisplay.textContent)) {
    if(calculatorDisplay.textContent)
    calculatorDisplay.textContent += ` ${operator} `;
  }
  else if(calculatorDisplay.textContent) {
    calculate();
    calculatorDisplay.textContent += ` ${operator} `;
  }
}

function clear() {
  calculatorDisplay.textContent = '';
  num1 = 0;
  num2 = 0;
  operator = "";
  result = 0;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operator) {
  switch(operator) {
    case '+': {
      result = add(num1,num2);
      break;
    }

    case '-': {
      result = subtract(num1, num2);
      break;
    }

    case '*': {
      result = multiply(num1, num2);
      break;
    } 

    case '/': {
      result = divide(num1, num2);
      break;
    }
    default: break;
  }
  return result;
}

function calculate() {
  let expressions = calculatorDisplay.textContent.split(' ');
  num1 = parseInt(expressions[0]);
  num2 = parseInt(expressions[2]);
  operator = expressions[1];
  result = operate(num1, num2, operator);
  calculatorDisplay.textContent = result;
}