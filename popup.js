let currentInput = '';
let history = [];

// Load history from storage
chrome.storage.local.get(['calculatorHistory'], function (result) {
  if (result.calculatorHistory) {
    history = result.calculatorHistory;
    updateHistoryDisplay();
  }
});

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function appendOperation(operation) {
  currentInput += operation;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  try {
    const result = eval(currentInput);
    history.push(`${currentInput} = ${result}`);
    if (history.length > 5) history.shift(); // Keep only last 5 entries
    chrome.storage.local.set({ calculatorHistory: history }, function () {
      updateHistoryDisplay();
    });
    currentInput = result.toString();
    updateDisplay();
  } catch (error) {
    currentInput = 'Error';
    updateDisplay();
  }
}

function advancedOperation(operation) {
  const input = parseFloat(currentInput);
  let result;
  switch (operation) {
    case 'sqrt':
      result = Math.sqrt(input);
      break;
    case 'pow':
      result = Math.pow(input, 2);
      break;
    case 'sin':
      result = Math.sin((input * Math.PI) / 180); // Convert degrees to radians
      break;
    case 'cos':
      result = Math.cos((input * Math.PI) / 180);
      break;
    case 'tan':
      result = Math.tan((input * Math.PI) / 180);
      break;
    default:
      result = 'Error';
  }
  history.push(`${operation}(${input}) = ${result}`);
  if (history.length > 5) history.shift();
  chrome.storage.local.set({ calculatorHistory: history }, function () {
    updateHistoryDisplay();
  });
  currentInput = result.toString();
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('result').value = currentInput;
}

function updateHistoryDisplay() {
  const historyElement = document.getElementById('history');
  historyElement.innerHTML = history.join('<br>');
}
