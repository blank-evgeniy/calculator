let firstNum = "0";
let secondNum = "";
let prevResult = "";
let operation = "";
let isFirstNum = true;

const display = document.getElementById("display");

const updateDisplay = () => {
  let newValue;

  if (prevResult) {
    newValue = prevResult + " " + operation + " " + secondNum;
  } else {
    newValue = firstNum + " " + operation + " " + secondNum;
  }

  display.value = newValue;
};

updateDisplay();

const setNum = (char) => {
  let num = isFirstNum ? firstNum : secondNum;
  if (isFirstNum && prevResult) {
    prevResult = "";
  }

  if (num.length > 10) return;

  switch (char) {
    case "0":
      if (num !== "0") {
        num += char;
      }
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (num === "0") num = "";
      num += char;
      break;
    case ".":
      if (num === "") num += "0.";
      if (!num.includes(".")) num += char;
      break;
  }

  if (isFirstNum) {
    firstNum = num;
  } else {
    secondNum = num;
  }
  updateDisplay();
};

const setOperation = (char) => {
  if (isFirstNum) {
    isFirstNum = false;
  } else {
    calculate();
    operation = char;
    updateDisplay();
  }

  operation = char;
  updateDisplay();
};

const calculate = () => {
  if (!(firstNum || prevResult) || !secondNum || !operation) return;

  switch (operation) {
    case "+":
      prevResult = prevResult
        ? Number(prevResult) + Number(secondNum)
        : Number(firstNum) + Number(secondNum);
      break;
    case "-":
      prevResult = prevResult
        ? Number(prevResult) - Number(secondNum)
        : Number(firstNum) - Number(secondNum);
      break;
    case "x":
      prevResult = prevResult
        ? Number(prevResult) * Number(secondNum)
        : Number(firstNum) * Number(secondNum);
      break;
    case "/":
      prevResult = prevResult
        ? Number(prevResult) / Number(secondNum)
        : Number(firstNum) / Number(secondNum);
      prevResult = parseFloat(prevResult.toFixed(5));
      break;
  }

  operation = "";
  firstNum = "";
  secondNum = "";
  isFirstNum = true;
  updateDisplay();
};

const clear = () => {
  firstNum = "0";
  secondNum = "";
  operation = "";
  prevResult = "";
  isFirstNum = true;
  updateDisplay();
};

const backspace = () => {
  if (secondNum) {
    secondNum = secondNum.substring(0, secondNum.length - 1);
  } else if (operation) {
    operation = "";
    isFirstNum = true;
  } else if (firstNum) {
    firstNum = firstNum.substring(0, firstNum.length - 1);
    if (firstNum === "") firstNum = "0";
  }

  updateDisplay();
};

const percent = () => {
  if (!(firstNum || prevResult) || !secondNum || !operation) return;
  console.log(operation);

  if (operation === "x" || operation === "/") {
    secondNum = secondNum / 100;
    calculate();
  }
};

const calcButton = document.getElementById("calc");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("back");
const percentButton = document.getElementById("percent");
const numButtons = document.querySelectorAll(".buttons .num");
const operationButtons = document.querySelectorAll(".buttons .operation");

numButtons.forEach((button) => {
  button.addEventListener("click", () => setNum(button.textContent));
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

calcButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clear);
backspaceButton.addEventListener("click", backspace);
percentButton.addEventListener("click", percent);
