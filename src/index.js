import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const value = searchBox.value.trim();
  console.log(value);
  if (!value) {
    clearPage();
    return;
  }

  fetchCountries(value)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      renderCountries(data);
    })
    .catch(error => {
      clearPage();
      Notify.failure('Oops, there is no country with that name');
    });
}

const generateMarkupCountryInfo = data =>
  data.reduce(
    (acc, { flags: { svg, alt }, name, capital, population, languages }) => {
      console.log(data);
      console.log(alt);

      languages = Object.values(languages).join(', ');
      console.log(languages);
      return (
        acc +
        ` <img src="${svg}" alt="${alt}" width="320" height="auto">
            <p> ${name.official}</p>
            <p>Capital: <span> ${capital}</span></p>
            <p>Population: <span> ${population}</span></p>
            <p>Languages: <span> ${languages}</span></p>`
      );
    },
    ''
  );

const generateMarkupCountryList = data =>
  data.reduce((acc, { flags: { svg, alt }, name: { official } }) => {
    return (
      acc +
      `<li>
        <img src="${svg}" alt="${alt}" width="70">
        <span>${official}</span>
      </li>`
    );
  }, '');

function renderCountries(result) {
  if (result.length === 1) {
    countriesList.innerHTML = '';
    countryInfo.innerHTML = generateMarkupCountryInfo(result);
  }
  if (result.length >= 2 && result.length <= 10) {
    countryInfo.innerHTML = '';
    countriesList.innerHTML = generateMarkupCountryList(result);
  }
}

function clearPage() {
  countriesList.innerHTML = '';
  countryInfo.innerHTML = '';
}
