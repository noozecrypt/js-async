'use strict';

const wait = function (delayInSeconds) {
    return new Promise((resolve) => setTimeout(resolve, delayInSeconds * 1000));
}

wait(1)
    .then(() => {
        console.log('1 second passed');
        return wait(1);
    })
    .then(() => {
        console.log('2 seconds passed');
        return wait(1);
    })
    .then(() => {
        console.log('3 seconds passed');
        return wait(1);
    })
    .then(() => console.log('4 seconds passed'));