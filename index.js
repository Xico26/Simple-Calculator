const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operators]");
const equalsBtn = document.querySelector("[data-equals]");
const percentageBtn = document.querySelector("[data-percentage]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const previousNumText = document.querySelector("[data-previous-num-text]");
const currentNumText = document.querySelector("[data-current-num-text]");

class Calculator {
  constructor(previousNumText, currentNumText) {
    this.previousNumText = previousNumText;
    this.currentNumText = currentNumText;
    this.clear();
  }

  clear() {
    this.currentNum = "";
    this.previousNum = "";
    this.operation = undefined;
  }

  delete() {
    this.currentNum = this.currentNum.toString().slice(0, -1)
  }

  addNum(num) {
    if (num === "," && this.currentNum.includes(",")) {
        return
    }
    this.currentNum = this.currentNum.toString() + num.toString();
  }

  chooseOperation(operation) {
    if (this.currentNum === "") {
        return
    }
    if (this.previousNum !== "") {
        this.calculate()
    }
    this.operation = operation;
    this.previousNum = this.currentNum;
    this.currentNum = "";

  }

  percentage() {
    let result
    let curr = parseFloat(this.currentNum)
    if (isNaN(curr)) {
      return;
    }
    result = curr / 100
    this.currentNum = result;
    this.operation = undefined;
    this.previousNum = "";
  }

  calculate() {
    let result
    let prev = parseFloat(this.previousNum)
    let curr = parseFloat(this.currentNum)
    if (isNaN(prev) || isNaN(curr)) {
        return
    }
    switch (this.operation) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "÷":
            result = prev / curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "%":
            result = curr / 100;
            break;
        default: 
        return

    }
    this.currentNum = result
    this.operation = undefined
    this.previousNum = ""
  }

  updateDisplay() {
    this.currentNumText.innerText = this.currentNum;
    if (this.operation) {
        this.previousNumText.innerText = `${this.previousNum} ${this.operation}`
    } else {
        this.previousNumText.innerText = ""
    }
    
  }
}

const calculator = new Calculator(previousNumText, currentNumText);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.addNum(btn.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
    calculator.calculate()
    calculator.updateDisplay()
})

clearBtn.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})

percentageBtn.addEventListener("click", () => {
    calculator.percentage()
    calculator.updateDisplay()
})
