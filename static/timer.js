const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let longBreakTime = 15 * 60; // 15 minutes in seconds
let secondsRemaining;
let isBreak = false;
let sessionCount = 0; 
let timerInterval;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startTimer() {
  secondsRemaining = isBreak ? secondsRemaining : workTime;
  displayTime(secondsRemaining); 

  timerInterval = setInterval(() => {
    secondsRemaining--;
    displayTime(secondsRemaining);

    if (secondsRemaining === 0) {
      clearInterval(timerInterval);
      sessionCount++;

      if (sessionCount % 4 === 0) { 
        isBreak = true;
        secondsRemaining = longBreakTime;
      } else if (sessionCount % 4 != 0) {
        isBreak = true;
        secondsRemaining = breakTime
      } else {
        isBreak = !isBreak; 
      }

      startTimer(); 
    }
  }, 1000); 
}

function displayTime(seconds) {
  timerDisplay.textContent = formatTime(seconds);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  isBreak = false;
  sessionCount = 0; 
  secondsRemaining = workTime;
  displayTime(secondsRemaining);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

displayTime(workTime); 


// Dragging function

const timer = document.querySelector('.timer'); // Get the timer element
let isDragging = false;
let offsetX, offsetY;

// Add an event listener on the header (or the whole timer if you don't have one)
const timerHeader = document.querySelector('.timer-header') || timer; 
timerHeader.addEventListener('mousedown', startDragging);

function startDragging(e) {
  isDragging = true;

  // Calculate initial offset of the mouse from the top-left of the timer 
  offsetX = e.clientX - timer.offsetLeft;
  offsetY = e.clientY - timer.offsetTop;

  document.addEventListener('mousemove', dragTimer);
  document.addEventListener('mouseup', stopDragging);
}

function dragTimer(e) {
  if (!isDragging) return; 

  // Update timer position based on mouse movement and offset
  timer.style.left = (e.clientX - offsetX) + 'px';
  timer.style.top = (e.clientY - offsetY) + 'px';
}

function stopDragging() {
  isDragging = false;
  document.removeEventListener('mousemove', dragTimer);
  document.removeEventListener('mouseup', stopDragging);
}
