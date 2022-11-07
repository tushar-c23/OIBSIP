class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clearAll()
    }

    clearAll() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        console.log("ClearAll")
    }

    clear() {
        this.currentOperand = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }


    appendNumber(number) {
        //console.log(number)
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return
        }
        if (this.operation === '+' || this.operation === '-' || this.operation === '×' || this.operation === '÷') {
            if (this.previousOperand !== '') {
                this.calculate()
            }
        }
        else {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate() {
        let result
        let resultAux
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) {
            return
        }
        switch (this.operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '×':
                result = prev * curr
                break
            case '÷':
                result = prev / curr
                break
        }

        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerPart = parseFloat(stringNumber.split('.')[0])
        const decimalPart = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerPart)) {
            integerDisplay = ''
        }
        else
        {
            integerDisplay = integerPart.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decimalPart != null)
        {
            return `${integerDisplay}.${decimalPart}`
        }
        else
        {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null)
        {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else
        {
            this.previousOperandText.innerText = ''
        }
    }
}


const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allClear]')
const clearButton = document.querySelector('[data-clear]')


const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        console.log(button.innerText)
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        console.log(button.innerText)
    })
})

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clearAll()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})