
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

document.addEventListener('DOMContentLoaded', () => {
    const datetimePicker = document.getElementById('datetime-picker');
    const startButton = document.querySelector('[data-start]');
    let interval;
    let userSelectedDate = null;


    flatpickr(datetimePicker, {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            const now = new Date();

            if (selectedDate < now) {
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future',
                });
                userSelectedDate = null;
                startButton.disabled = true;
            } else {
                userSelectedDate = selectedDate;
                startButton.disabled = false;
            }
        },
    });

    function updateTimer() {
        if (!userSelectedDate) return;

        const now = new Date().getTime();
        const distance = userSelectedDate.getTime() - now;

        if (distance < 0) {
            clearInterval(interval);
            document.querySelector('[data-days]').textContent = '00';
            document.querySelector('[data-hours]').textContent = '00';
            document.querySelector('[data-minutes]').textContent = '00';
            document.querySelector('[data-seconds]').textContent = '00';
            datetimePicker.disabled = false; 
            startButton.disabled = true;
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(distance);

        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
    }

    startButton.addEventListener('click', () => {
        if (!userSelectedDate) return;

        if (interval) clearInterval(interval);

        startButton.disabled = true;
        datetimePicker.disabled = true;

        interval = setInterval(updateTimer, 1000);
        updateTimer();
    });
});
