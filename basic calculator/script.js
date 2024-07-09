const display = document.getElementById('display');
let currentInput = '';
let operator = null;
let firstOperand = null;

function appendNumber(number) {
    if (currentInput.includes('.') && number === '.') return;
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && firstOperand === null) return;
    if (firstOperand === null) {
        firstOperand = currentInput;
        currentInput = '';
    }
    operator = op;
    updateDisplay(op);
}

function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (operator === null || currentInput === '' || firstOperand === null) return;
    const secondOperand = currentInput;
    currentInput = evaluate(firstOperand, secondOperand, operator);
    firstOperand = null;
    operator = null;
    updateDisplay();
}

function evaluate(operand1, operand2, operator) {
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);
    if (isNaN(num1) || isNaN(num2)) return '';
    let result = '';
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Error';
            break;
        default:
            return '';
    }
    return result.toString();
}

function updateDisplay(op = '') {
    if (operator) {
        display.textContent = `${firstOperand} ${operator} ${currentInput}`;
    } else {
        display.textContent = currentInput || '0';
    }
}
