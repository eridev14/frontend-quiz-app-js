import theme from './js/theme';
import json from './questions.json'
const scores = {
  correct: 0
}

//get fetch questions api
// async function getQuestions() {
//   try {
//     const data = await fetch('questions.json');
//     const json = await data.json();
//     return json;
//   } catch (error) {
//     console.log(error);
//   }
// }

// Elementos del DOM
const _themeToggle = document.querySelector('.header__check');
const _title = document.querySelector('.header__title');

//fragmentos pricipales
const _quizMain = document.querySelector('.quiz--main')
const _quizQuestions = document.querySelector('.quiz--questions')
const _quizComplete = document.querySelector('.quiz--complete')

// Manejador del evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  theme(_themeToggle);
});

const _quizMainOptions = document.querySelector('.quiz--main .quiz__options');

_quizMainOptions.addEventListener('click', (e) => {
  let choice = e.target.closest('.choice');
  if (!choice) {
    return
  }

  let title = choice.querySelector('.choice__text').cloneNode(true);
  let icon = choice.querySelector('.choice__icon').cloneNode(true);
  _title.append(icon, title);
  _quizMain.classList.add('no-visible');
  _quizQuestions.classList.remove('no-visible');
  // getQuestions().then(data => {
  //   drawQuestion(data.categories[title.textContent], icon, title)
  // })
  drawQuestion(json.categories[title.textContent], icon, title)

});

function drawQuestion(dataCategory, icon, title) {
  let correct = false;
  let from = 1;
  let to = dataCategory.length;
  let _inp = _quizQuestions.querySelector('.quiz__in');
  let _out = _quizQuestions.querySelector('.quiz__ou');
  let _ask = _quizQuestions.querySelector('.quiz__ask');
  let _progresItem = _quizQuestions.querySelector('.quiz__progres-item');
  let _btnNext = _quizQuestions.querySelector('.btn--answer');
  let choices = _quizQuestions.querySelector('.quiz__options-container')
  let choiceArray = _quizQuestions.querySelectorAll('.quiz__options-container .choice .choice__text');
  _out.textContent = to;

  draw();

  _btnNext.addEventListener('click', handleNextBtnClick);

  function handleNextBtnClick() {
    if (correct) {
      scores.correct++;
    }

    draw();
  }

  function draw() {
    if (from <= to) {
      _inp.textContent = from;
      _ask.textContent = dataCategory[from - 1].question;
      _progresItem.style.width = `${((from * 100 / to))}%`
      choiceArray[0].textContent = dataCategory[from - 1].options[0]
      choiceArray[1].textContent = dataCategory[from - 1].options[1]
      choiceArray[2].textContent = dataCategory[from - 1].options[2]
      choiceArray[3].textContent = dataCategory[from - 1].options[3]
      from++;
    } else {
      _quizQuestions.classList.add('no-visible');
      _quizComplete.classList.remove('no-visible');
      _btnNext.removeEventListener('click', handleNextBtnClick);

      let _titleComplete = _quizComplete.querySelector('.choice__header');
      _titleComplete.innerHTML = ''
      _titleComplete.append(icon, title);
      let _numberEsp = _quizComplete.querySelector('.choice__number-esp');
      let _numberRes = _quizComplete.querySelector('.choice__number');
      _numberEsp.textContent = to;
      _numberRes.textContent = scores.correct;
      scores.correct = 0;
    }
  }

  choices.addEventListener('click', (e) => {
    let choice = e.target.closest('.choice');
    if (!choice) {
      return
    }
    let answer = choice.querySelector('.choice__text').textContent;
    console.log(answer);
    console.log(dataCategory[from - 2].answer);
    if (answer === dataCategory[from - 2].answer) {
      correct = true;
    } else {
      correct = false;
    }
    console.log(scores.correct);
  })

}


// play again
const _btnPlay = document.querySelector('.btn--again');
_btnPlay.addEventListener('click', () => {
  _quizComplete.classList.add('no-visible');
  _quizMain.classList.remove('no-visible');
});
