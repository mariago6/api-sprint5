const API_JOKES = 'https://icanhazdadjoke.com/'; 
const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona,ES&appid=0c219334560571ca1d8636a5b846e5d8'; 
const API_CHUCKNORRIS = 'https://api.chucknorris.io/jokes/random'; 
let currentJoke; 
let currentChuckNorrisJoke; 
let reportJokes = [];
let isFirstJoke = true;
getWeather(); 
let randomNumber = true; 

function printJokes() {
  if (randomNumber) {
    getJokes();
    randomNumber = false;
    return; 
  } else {
    getJokesChuckNorris();
    randomNumber = true; 
    return; 
  }
}

function getJokes() {
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
    .then(data => {
      document.getElementById('weather').src = drawIconWeather(data.weather[0].icon);
      return data;
    })
    .then(data => {
      const temp = Number(data.main.temp) - 273.15;
      document.getElementById('temp').innerText = temp.toFixed(2) + ' ºC';
    }); 
}

function drawIconWeather(icon) {
  return 'https://openweathermap.org/img/wn/' + icon + '.png';
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