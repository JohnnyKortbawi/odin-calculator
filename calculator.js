
let num1 = 0;
let num2 = 0;
let operator = "";
let result = 0;

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