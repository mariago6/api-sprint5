const API_JOKES = 'https://icanhazdadjoke.com/'; 
const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona,ES&appid=0c219334560571ca1d8636a5b846e5d8'; 
const API_CHUCKNORRIS = 'https://api.chucknorris.io/jokes/random'; 
let currentJoke; 
let currentChuckNorrisJoke; 
let currentWeather; 
let currentTemperature; 
let reportJokes = [];
let isFirstJoke = true;
getWeather(); 
let randomNumber = true; 

function printJokes() {
  if (randomNumber) {
    getUser();
    randomNumber = false;
    return; 
  } else {
    getJokesChuckNorris();
    randomNumber = true; 
    return; 
  }
}

function getUser() {
  fetch(API_JOKES, {
    headers: { Accept: 'application/json' }
  })
  .then(response => response.json())
  .then(data => currentJoke = data.joke)
  .then(() => document.getElementById('joke').innerHTML = currentJoke);

}

function getJokesChuckNorris() {
  fetch(API_CHUCKNORRIS)
    .then(response => response.json())
    .then(data => currentChuckNorrisJoke = data.value)
    .then(() => document.getElementById('joke').innerHTML = currentChuckNorrisJoke);   
}

function getWeather() {
  fetch(API_WEATHER)
    .then(response => response.json())
    .then(data => currentWeather = data.weather[0].description)
    .then(() => document.getElementById('weather').innerHTML = currentWeather); 
}

function jokeFeedback(score) {
  if (isFirstJoke) {
    isFirstJoke = false;
    return;
  }
  const date = new Date();
  const actualDate = date.toISOString(); 
  const jokeParams = {
    joke: currentJoke, 
    score: score, 
    date: actualDate
  }; 
  reportJokes.push(jokeParams); 
  console.log(reportJokes); 
}