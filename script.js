const API_URL = 'https://icanhazdadjoke.com/'; 
const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona,ES&appid=0c219334560571ca1d8636a5b846e5d8'; 
let currentJoke; 
let currentWeather; 
let currentTemperature; 
let reportJokes = [];
let isFirstJoke = true;
getWeather(); 

function getUser() {
  fetch(API_URL, {
    headers: { Accept: 'application/json' }
  })
  .then(response => response.json())
  .then(data => currentJoke = data.joke)
  .then(() => document.getElementById('joke').innerHTML = currentJoke);
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