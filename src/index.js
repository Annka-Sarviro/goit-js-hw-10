import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
var debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    ulEl: document.querySelector('.country-list'),
    boxEl: document.querySelector('.country-info'),
}

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch (event) {
    event.preventDefault();
    const searchValue = refs.inputEl.value.trim();
    if (!searchValue) {return console.log("введите данные")}
    fetchCountries(searchValue)
    .then((data) =>{
        if (data.length>= 10)
        {return console.log("точнее запрос")}

        if (data.length>1){
         return renderCountriesList(data);
        }

        renderCountryCard(data)
    } 
    ).catch(error => console.log("не нашли"));

}

function renderCountriesList() {
    console.log('a lot of Countries')
}

function renderCountryCard() {
    console.log('one Country')
}