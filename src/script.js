'use strict';

const promise = new Promise((resolve, reject) => {
    console.log('Lottery draw is happening 🔮');
    setTimeout(() => {
        if (Math.random() >= 0.5) {
            resolve('You Won 💰');
        } else {
            reject(new Error('You lost your money 💩'));
        }
    }, 2000);
});

promise.then(result => console.log(result)).catch(err => console.error(err));