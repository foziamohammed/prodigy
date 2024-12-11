let startTime, updatedTime, difference, tInterval, running = false, paused = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1000);
        running = true;
        paused = false;
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function pauseTimer() {
    if (!paused) {
        clearInterval(tInterval);
        paused = true;
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    display.innerHTML = '00:00:00';
    laps = [];
    renderLaps();
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
}

function lapTimer() {
    if (running) {
        laps.push(display.innerHTML);
        renderLaps();
    }
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('li');
        lapElement.innerText = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapElement);
    });
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
