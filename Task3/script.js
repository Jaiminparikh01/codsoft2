const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerText;

        // If clear button is clicked, reset everything
        if (buttonText === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            display.value = '';
            return;
        }

        // If an operator is clicked
        if (['+', '-', '*', '/'].includes(buttonText)) {
            if (previousInput && currentInput) {
                calculate();
            }
            operator = buttonText;
            previousInput = currentInput;
            currentInput = '';
            return;
        }

        // If equals button is clicked
        if (buttonText === '=') {
            calculate();
            return;
        }

        // If it's a number or decimal, add it to the current input
        if (buttonText === '.') {
            if (!currentInput.includes('.')) {
                currentInput += buttonText;
            }
        } else {
            currentInput += buttonText;
        }

        display.value = currentInput;
    });
});

function calculate() {
    if (operator && previousInput && currentInput) {
        let result;
        switch (operator) {
            case '+':
                result = parseFloat(previousInput) + parseFloat(currentInput);
                break;
            case '-':
                result = parseFloat(previousInput) - parseFloat(currentInput);
                break;
            case '*':
                result = parseFloat(previousInput) * parseFloat(currentInput);
                break;
            case '/':
                if (currentInput === '0') {
                    alert('Cannot divide by zero');
                    return;
                }
                result = parseFloat(previousInput) / parseFloat(currentInput);
                break;
            default:
                return;
        }
        display.value = result;
        previousInput = result;
        currentInput = '';
    }
}
