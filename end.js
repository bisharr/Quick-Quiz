'use strict';

const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highscores')) || [];

const max_high_scores = 5;

finalScore.innerHTML = mostRecentScore;

username.addEventListener('keyup', () => {
  console.log(username.value);
  saveScoreBtn.disabled = !username.value;
});

saveScoreBtn.addEventListener('click', function (e) {
  console.log('saveScoreBtn clicked');
  e.preventDefault();

  const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value,
  };
  highScores.push(score);

  highScores.sort((a, b) => b.score - a.score);

  highScores.splice(5);

  localStorage.getItem('highScores', JSON.stringify(highScores));

  window.location.assign('/');
});
