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
    countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (countryCode) {

    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/alpha/${countryCode}`);
    request.send();

    request.addEventListener('load', function () {

        const [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountry(data);
        const [neighbor] = data.borders;
        if (!neighbor) return;

        const request = new XMLHttpRequest();
        request.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
        request.send();

        request.addEventListener('load', function () {
            const [data] = JSON.parse(this.responseText);
            console.log(data);
            renderCountry(data, 'neighbour');
        });

    });
};

// getCountryAndNeighbor('in');
getCountryAndNeighbor('us');


///////////////////////////////////////
