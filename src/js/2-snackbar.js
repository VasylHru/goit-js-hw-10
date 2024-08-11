document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', event => {
      event.preventDefault();
  
      const delay = Number(form.elements.delay.value);
      const state = form.elements.state.value;
  
      createPromise(delay, state)
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
        })
        .finally(() => {
          form.reset();
        });
    });
  });
  
  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else if (state === 'rejected') {
          reject(`❌ Rejected promise in ${delay}ms`);
        }
      }, delay);
    });
  }
  