import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

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

  document.addEventListener('DOMContentLoaded', function() {
    const datetimePicker = document.getElementById('datetime-picker');
    const startButton = document.getElementById('startButton');
    let countdownInterval;
    let targetDate;


    flatpickr(datetimePicker, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: function(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
          iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future.'
          });
          startButton.disabled = true;
        } else {
          startButton.disabled = false;
          targetDate = selectedDate;
        }
      }
    });

    
    startButton.addEventListener('click', function() {
      startButton.disabled = true;
      datetimePicker.disabled = true;

      countdownInterval = setInterval(function() {
        const now = new Date();
        const msDiff = targetDate - now;

        if (msDiff <= 0) {
          clearInterval(countdownInterval);
          iziToast.success({
            title: 'Countdown Finished',
            message: 'The countdown timer has ended!'
          });
          datetimePicker.disabled = false;
        } else {
          const { days, hours, minutes, seconds } = convertMs(msDiff);
          document.querySelector('[data-days]').textContent = addLeadingZero(days);
          document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
          document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
          document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
        }
      }, 1000);
    });
  });