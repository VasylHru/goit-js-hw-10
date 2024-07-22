import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";



const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.getElementById('start-button');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;
let targetDate;


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}


function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}


function startCountdown() {
  const currentTime = new Date().getTime();
  const difference = targetDate - currentTime;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    updateTimerDisplay(0);
    iziToast.error({
      title: 'Time\'s Up!',
      message: 'The countdown has finished.'
    });
    enableInputs();
    return;
  }

  updateTimerDisplay(difference);
}


function disableInputs() {
  datetimePicker.disabled = true;
  startButton.disabled = true;
}


function enableInputs() {
  datetimePicker.disabled = false;
  startButton.disabled = false;
}


flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose: function(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Invalid Date',
        message: 'Please choose a date in the future.'
      });
      startButton.disabled = true;
      return;
    }
    targetDate = selectedDate;
    startButton.disabled = false;
  }
});


startButton.addEventListener('click', function() {
  disableInputs();
  countdownInterval = setInterval(startCountdown, 1000);
});