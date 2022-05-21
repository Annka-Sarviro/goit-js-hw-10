import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    ulEl: document.querySelector('.country-list'),
    boxEl: document.querySelector('.country-info'),
}

Notify.init({
    width: '380px',
    fontSize: '18px',
});

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch (event) {
    event.preventDefault();
    const searchValue = refs.inputEl.value.trim();
   
    if (!searchValue) {return console.log("введите данные")}

    fetchCountries(searchValue)
    .then((data) =>{
        return renderCountries(data);       
    } 
    ).catch(error => Notify.failure("Oops, there is no country with that name" ));

}

function renderCountries(data) {
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

function renderCountriesList(data) {
    const list = data.map(renderList).join('');
    refs.ulEl.insertAdjacentHTML('beforeend', list);    
}


function renderCountryCard(data) {
    const card = data.map(renderCard).join('');
    refs.boxEl.insertAdjacentHTML('beforeend', card);
    
}

function renderList({flags, name}) {
    return `<li class = "list-item">
                <img src = ${flags.svg} alt="flag ${name.official}" width="60" height = '40'>
                <p>${name.official}</p> 
        </li>`
}

function renderCard({name, capital, population, languages, flags}) {
    return `
    <div class = "thumb">
    <img src=${flags.svg} alt="flag ${name.official}" width="60" height='40'>
    <h1>${name.official}</h1> </div>
      <ul>
        <li class = 'info_item'><span>Capital</span>: ${capital}</li>
        <li class = 'info_item'><span>Population</span>: ${population}</li>        
        <li class = 'info_item'><span>Languages</span>: ${Object.values(languages).map(x=>x).join(', ')}</li>
      </ul>
    `
}