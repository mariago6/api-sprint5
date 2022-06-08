const API_URL = 'https://icanhazdadjoke.com/'; 

function getUser() {
  fetch(API_URL, {
    headers: { Accept: 'application/json' }
  })
  .then(response => response.json())
  .then(data => document.getElementById('joke').innerHTML = data.joke);
}