'use strict';
console.log('hello world form game');

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progresstext = document.getElementById('progresstext');
const scoreText = document.getElementById('score');
console.log(progresstext);
const progressBarfull = document.getElementById('progressBarfull');

let currentQuestion = {};
let acceeptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: 'inside Which html element do we put the javascript ??',
    choice1: '<script>',
    choice2: '<javascript>',
    choice3: '<js>',
    choice4: '<scripting>',
    answer: 1,
  },
  {
    question:
      'What is the correct syntax for referring to an external script called xxx.js ?',
    choice1: '<script href= "xxx.js">',
    choice2: '<script name= "xxx.js">',
    choice3: '<script src= "xxx.js">',
    choice4: '<script file= "xxx.js">',
    answer: 3,
  },
  {
    question: 'How do you write "Hello World" in an alert box ?',
    choice1: 'msgBox("Hellow world");',
    choice2: 'alertBox("Hellow world");',
    choice3: 'msg("Hellow world");',
    choice4: 'alert("Hellow world");',
    answer: 4,
  },
  {
    question:
      'What is the correct syntax for referring to an external script called xxx.js ?',
    choice1: '<script href= "xxx.js">',
    choice2: '<script name= "xxx.js">',
    choice3: '<script src= "xxx.js">',
    choice4: '<script file= "xxx.js">',
    answer: 3,
  },
  // {
  //   question: 'How was first president in somalia',
  //   choice1: 'Hassan sheikj',
  //   choice2: 'Aadan cadde',
  //   choice3: 'Farmaajo',
  //   choice4: 'Abdirashid ali ',
  //   answer: 2,
  // },
];

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    //go to the end
    return window.location.assign('/end.html');
  }
  questionCounter++;
  progresstext.innerText = ` Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  // console.log((questionCounter / MAX_QUESTIONS) * 100);

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceeptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceeptingAnswers) return;

    acceeptingAnswers = false;
    const selectedChoices = e.target;
    const selectedAnswer = selectedChoices.dataset['number'];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoices.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoices.parentElement.classList.remove(classToApply);

      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
