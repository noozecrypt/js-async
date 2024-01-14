'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {

    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} Million</p>
            <p class="country__row"><span>🗣️</span>${JSON.stringify(data.languages)}</p>
            <p class="country__row"><span>💰</span>${JSON.stringify(data.currencies)}</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
    countriesContainer.insertAdjacentHTML('beforeend', msg);
};

const getCountryAndNeighbor = function (countryCode) {

    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(response => response.json())
        .then(([data]) => {
            renderCountry(data);
            const [neighbor] = data.borders;
            if (!neighbor) return;
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);

        })
        .then(response => response.json())
        .then(([data]) => renderCountry(data))
        .catch(err => {
            console.error(`${err} ‼‼`);
            renderError(`Something went wrong 😔 ${err.message}`);
        }).finally(() => {
            btn.style.display = 'none';
            countriesContainer.style.opacity = 1;

        });

};

btn.addEventListener('click', function () {
    getCountryAndNeighbor('de');
});