const API_URL = 'https://icanhazdadjoke.com/'; 
let currentJoke; 
let reportJokes = [];
let isFirstJoke = true;

function getUser() {
  fetch(API_URL, {
    headers: { Accept: 'application/json' }
  })
  .then(response => response.json())
  .then(data => currentJoke = data.joke)
  .then(() => document.getElementById('joke').innerHTML = currentJoke);
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