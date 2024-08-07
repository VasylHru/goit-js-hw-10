import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerInterval = null;


flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate && userSelectedDate > new Date()) {
            startButton.disabled = false;
        } else {
            startButton.disabled = true;
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topCenter'
            });
        }
    }
});

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
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateTimer() {
    const now = new Date();
    const timeDiff = userSelectedDate - now;

    if (timeDiff <= 0) {
        clearInterval(timerInterval);
        daysElem.textContent = '00';
        hoursElem.textContent = '00';
        minutesElem.textContent = '00';
        secondsElem.textContent = '00';
        startButton.disabled = false;
        datetimePicker.disabled = false;
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDiff);
    daysElem.textContent = addLeadingZero(days);
    hoursElem.textContent = addLeadingZero(hours);
    minutesElem.textContent = addLeadingZero(minutes);
    secondsElem.textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', () => {
    if (!userSelectedDate || userSelectedDate <= new Date()) {
        return;
    }

    startButton.disabled = true;
    datetimePicker.disabled = true;
    updateTimer(); 
    timerInterval = setInterval(updateTimer, 1000); 
});
