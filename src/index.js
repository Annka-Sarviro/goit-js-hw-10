import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    ulEl: document.querySelector('.country-list'),
    boxEl: document.querySelector('.country-info'),
}

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch (event) {
    event.preventDefault();
    const searchValue = refs.inputEl.value;
    const searchValueTrim = searchValue.trim();
   
    if (!searchValueTrim) {return console.log("введите данные")}
    fetchCountries(searchValueTrim)
    .then((data) =>{
        refs.ulEl.innerHTML='';
        refs.boxEl.innerHTML='';
        if (data.length>= 10)
        {return Notify.info('Too many matches found. Please enter a more specific name.');
    }

        if (data.length>1){
         return renderCountriesList(data);
        }
            
        renderCountryCard(data)
    } 
    ).catch(error => Notify.failure("Oops, there is no country with that name" ));

}

function renderCountriesList(data) {
    const list = data.map(renderList).join('');
    refs.ulEl.insertAdjacentHTML('beforeend', list);    
}

function renderList (data) {
    return `<li>
                <img src = ${data.flags.svg} alt="flag ${data.name.official}" width="60">
                <p>${data.name.official}</p> 
        </li>`
}

function renderCountryCard(data) {
    const card = data.map(renderCard).join('');
    refs.boxEl.insertAdjacentHTML('beforeend', card);
    
}

function renderCard(data) {
    return `
    <img src=${data.flags.svg} alt="flag ${data.name.official}" width="80">
      <h1>${data.name.official}</h1>
      <ul>
        <li>Capital: ${data.capital}</li>
        <li>Population: ${data.population}</li>        
        <li>Languages: ${Object.values(data.languages).map(x=>x).join(', ')}</li>
      </ul>
    `
}