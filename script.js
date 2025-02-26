document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".button");

  let currentInput = ""; 
  let lastResult = "";  

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      const func = button.dataset.function;

      if (func) {
        handleFunction(func);
      } else if (value) {
        handleInput(value);
      } else if (button.id === "clear") {
        clearDisplay();
      } else if (button.id === "equals") {
        calculateResult();
      }
    });
  });

  function handleInput(value) {
    if (isOperator(value) && isOperator(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1);
    }

    currentInput += value;
    updateDisplay(currentInput);
  }

  function calculateResult() {
    try {
      const sanitizedInput = sanitizeInput(currentInput);
      const result = eval(sanitizedInput);

      currentInput = result.toString();
      lastResult = result;
      updateDisplay(currentInput);
    } catch (error) {
      updateDisplay("Error");
      currentInput = "";
    }
  }

  function handleFunction(func) {
    try {
      const number = parseFloat(currentInput || lastResult || "0");
      const result = eval(`${func}(${number})`);
      currentInput = result.toString();
      updateDisplay(currentInput);
    } catch (error) {
      updateDisplay("Error");
      currentInput = "";
    }
  }

  function clearDisplay() {
    currentInput = "";
    updateDisplay("0");
  }

  function updateDisplay(value) {
    display.value = value;
  }

  function isOperator(value) {
    return ["+", "-", "*", "/"].includes(value);
  }

  function sanitizeInput(input) {
    return input.replace(/[^0-9+\-*/.]/g, "");
  }
});
