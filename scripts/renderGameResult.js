const MESSAGE_DISPLAY = document.querySelector('.msg-container');

export function renderGameResult() {
  MESSAGE_DISPLAY.innerHTML = '';
  renderResult();
}

function renderResult(resultFromStorage = localStorage.getItem('result')) {
  const result = document.createElement('h2');
  result.classList.toggle('msg');
  result.classList.toggle('result');
  result.textContent = resultFromStorage;
  result.style.animation = 'fadeIn 0.8s ease-out';
  result.style.color = resultColor();
  MESSAGE_DISPLAY.append(result);
}

function resultColor(resultFromStorage = localStorage.getItem('result')) {
  let resultColor;

  if (resultFromStorage.includes('X')) {
    resultColor = '#D45757';
  } else if (resultFromStorage.includes('O')) {
    resultColor = '#035668';
  } else {
    resultColor = '#373434';
  }

  return resultColor;
}
