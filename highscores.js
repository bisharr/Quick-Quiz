'use strict';
const highscoresList = document.getElementById('highscoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highscoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score"> ${score.name}- ${score.score}</li>`;
  })
  .join('');
