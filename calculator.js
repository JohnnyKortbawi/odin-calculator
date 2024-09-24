String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

let num1, num2 ,operator, result;
let numbers = ['1','2','3','4','5','6','7','8','9','0']
let operators = ['+','-','*','/'];
let zeroDivisionMessage = 'why?';

const calculatorDisplay = document.querySelector('#calculator-display');
clear();

document.addEventListener('keydown', event => {
  if (numbers.includes(event.key)) {
    displayNumber(event.key);
  }
  if(operators.includes(event.key)) {
    displayOperator(event.key);
  }
  if(event.key == '=' || event.key == 'Enter') {
    calculate();
  }
  if (event.key == 'Backspace' || event.key == 'Delete') {
    deleteChar();
  }
})

const numericButtons = document.querySelectorAll('.numeric-button');
numericButtons.forEach((numericButton) => {
  numericButton.addEventListener('click', () => displayNumber(event.target.innerHTML));
});

const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => displayOperator(event.target.innerHTML));
});

const decimalButton = document.querySelector('#button-decimal')
decimalButton.addEventListener('click', () => {displayDecimal();})

const equalButton = document.querySelector('#button-equal');
equalButton.addEventListener('click', () => {calculate();})

const clearButton = document.querySelector('#button-clear');
clearButton.addEventListener('click', () => {clear();})

const deleteButton = document.querySelector('#button-delete');
deleteButton.addEventListener('click', () => {deleteChar();})

function isNumeric(str) {
  if (typeof str != "string") return false  
  return !isNaN(str) && !isNaN(parseFloat(str)) 
}

function displayNumber(numericCharacter) {
  if(calculatorDisplay.textContent === zeroDivisionMessage) {
    clear();
    calculatorDisplay.textContent += numericCharacter;
  }
  else {
    calculatorDisplay.textContent += numericCharacter;
  }
}

function displayOperator(operator) {
  if(isNumeric(calculatorDisplay.textContent)) {
    if(calculatorDisplay.textContent)
    calculatorDisplay.textContent += ` ${operator} `;
  }
  else if(calculatorDisplay.textContent && isNumeric(calculatorDisplay.textContent.charAt(calculatorDisplay.textContent.length - 1))) {
    calculate();
    calculatorDisplay.textContent += ` ${operator} `;
  }
  else if (operators.includes(calculatorDisplay.textContent.charAt(calculatorDisplay.textContent.length - 2))) {
    calculatorDisplay.textContent = calculatorDisplay.textContent.replaceAt(calculatorDisplay.textContent.length - 2, operator);
  }
  else if (calculatorDisplay.textContent === zeroDivisionMessage){
    clear();
  }
}

function displayDecimal() {
  if(calculatorDisplay.textContent 
    && isNumeric(calculatorDisplay.textContent.charAt(calculatorDisplay.textContent.length - 1)) 
    && !hasDecimal(calculatorDisplay.textContent, calculatorDisplay.textContent.length - 1)) {
    calculatorDisplay.textContent += '.';
  }
}

function hasDecimal (text, index) {
  for (let i = index; i>0; i--) {
    if(text[i] == ' ') {
      return false;
    }
    if (text[i] === '.') {
      return true;
    }
  }
  return false;
}

function clear() {
  calculatorDisplay.textContent = '';
  num1 = 0;
  num2 = 0;
  operator = "";
  result = 0;
}

function deleteChar() {
  if (calculatorDisplay.textContent === zeroDivisionMessage){
    clear();
  }
  else {
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0,calculatorDisplay.textContent.length - 1);
  }
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
  num1 = parseFloat(expressions[0]);
  num2 = parseFloat(expressions[2]);
  operator = expressions[1];
  
  if(operator === '/' && num2 === 0) {
    calculatorDisplay.textContent = zeroDivisionMessage;
    return;
  }

  if(num1 && num2 && operator) {
    result = operate(num1, num2, operator);
    calculatorDisplay.textContent = parseFloat(result).toPrecision(5) / 1;
  }
  else {
    calculatorDisplay.textContent = num1;
  }
}