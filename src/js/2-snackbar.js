import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const delay = parseInt(form.elements.delay.value, 10);
        const state = form.elements.state.value;

        createAndHandlePromise(delay, state);
    });

    function createAndHandlePromise(delay, state) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve(`Promise fulfilled in ${delay}ms`);
                } else {
                    reject(`Promise rejected in ${delay}ms`);
                }
            }, delay);
        });

        promise
            .then(message => {
                iziToast.success({
                    title: 'Success',
                    message: message,
                    position: 'topRight'
                });
            })
            .catch(message => {
                iziToast.error({
                    title: 'Error',
                    message: message,
                    position: 'topRight'
                });
            });
    }
});