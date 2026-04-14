class Calculator {
    constructor(historyElement, currentElement) {
        this.historyElement = historyElement;
        this.currentElement = currentElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.historyOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.historyOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.historyOperand = `${this.currentOperand} ${this.getDisplaySymbol(operation)}`;
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    getDisplaySymbol(op) {
        const symbols = {
            add: '+',
            subtract: '−',
            multiply: '×',
            divide: '÷',
            pow: '^'
        };
        return symbols[op] || op;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.historyOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                computation = current === 0 ? 'Error' : prev / current;
                break;
            case 'pow':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.historyOperand = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    scientific(action) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        let result;

        switch (action) {
            case 'sin': result = Math.sin(current); break;
            case 'cos': result = Math.cos(current); break;
            case 'tan': result = Math.tan(current); break;
            case 'log': result = Math.log10(current); break;
            case 'ln': result = Math.log(current); break;
            case 'sqrt': result = Math.sqrt(current); break;
            case 'factorial': result = this.factorial(current); break;
            case 'percent': result = current / 100; break;
            case 'pi': result = Math.PI; break;
            case 'e': result = Math.E; break;
            case 'pow': 
                this.chooseOperation('pow');
                return;
            default: return;
        }

        this.currentOperand = result.toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    factorial(n) {
        if (n < 0) return 'Error';
        if (n === 0) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    updateDisplay() {
        this.currentElement.innerText = this.currentOperand;
        this.historyElement.innerText = this.historyOperand;
    }
}

const historyElement = document.getElementById('history');
const currentElement = document.getElementById('current');
const calculator = new Calculator(historyElement, currentElement);

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.innerText;

        if (button.classList.contains('number')) {
            calculator.appendNumber(value);
        } else if (button.classList.contains('operator')) {
            calculator.chooseOperation(action);
        } else if (button.classList.contains('scientific')) {
            calculator.scientific(action);
        } else if (action === 'clear') {
            calculator.clear();
        } else if (action === 'delete') {
            calculator.delete();
        } else if (action === 'percent') {
            calculator.scientific('percent');
        } else if (action === 'equals') {
            calculator.compute();
        }
    });
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW Registered', reg))
            .catch(err => console.log('SW Registration Failed', err));
    });
}
