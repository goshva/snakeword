const wordsInGame = [];
let uniqueWords = [];
const languages = {
  en: 'English',
  ru: 'Русский',
  la: 'Latin',
  ar: 'عربي',
  fr: 'Français',
  de: 'Deutsch',
}

function closePopup() {
  const popup = document.querySelector('.popup');
  popup.style.display = 'none';
  popup.style.opacity = 0;
}

function openPopup() {
  const popup = document.querySelector('.popup');
  popup.style.display = 'block';
  popup.style.opacity = 1;
}

//current language
const origLang = document.getElementById('orig-language');
origLang.textContent = languages[language];

//language we want translate found words to
const transLanguage = document.getElementById('trans-language');
Object.values(languages).forEach((lang) => {
  const option = document.createElement('option');
  option.textContent = lang;
  transLanguage.appendChild(option);
})

//timer
document.addEventListener('DOMContentLoaded', function runTimer() {
  // timer id
  let timerId = null;
  // 1 minute timer
  // last value can be easily changed, depends on how many minutes you need
  let deadline = 1000 * 60 * 1;
  // set remaining time as content of elements
  function countdownTimer() {
    if (deadline === 0) {
      const foundWords = document.getElementById('found-words');
      findwords.forEach((word) => {
        const wordDiv = document.createElement('div');
        wordDiv.textContent = word;
        foundWords.appendChild(wordDiv)
      })
      openPopup();
    }
// 
    const minutes = deadline > 0 ? Math.floor(deadline / 1000 / 60) % 60 : 0;
    const seconds = deadline > 0 ? Math.floor(deadline / 1000) % 60 : 0;
    $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    // decrease remaining time by one second
    deadline -= 1000;
  }
  // get elememts, containing time components

  const $minutes = document.querySelector('.timer__minutes');
  const $seconds = document.querySelector('.timer__seconds');
  // call countdownTimer function
  countdownTimer();
  // set countdownTimer function every second
  timerId = setInterval(countdownTimer, 1000);
});

//counting how many words are there on gamespace
function checkLetter(cell, dictionary, edge, wordsInGame) {
  const idStr = cell.id
  const id = Number(idStr.slice(1));
  const word = cell.textContent;
  function inner(word, id, dictionary) {
    //top
    if ((id - edge) >= 0) {
      const nearLetter = document.getElementById(`C${id - edge}`).textContent;
      const newWord = word + nearLetter;
      const newDictionary = dictionary.filter((word) => word.startsWith(newWord));
      if (newDictionary.includes(newWord)) {
        wordsInGame.push(newWord);
      }
      if (newDictionary.length > 0) {
        inner(newWord, id - edge, newDictionary)
      }
      
    }
    //right
    if (((id + 1) % edge !== 0) && id + 1 <= 80) {
      const nearLetter = document.getElementById(`C${id + 1}`).textContent;
      const newWord = word + nearLetter;
      const newDictionary = dictionary.filter((word) => word.startsWith(newWord));
      if (newDictionary.includes(newWord)) {
        wordsInGame.push(newWord);
      }
      if (newDictionary.length > 0) {
        inner(newWord, id + 1, newDictionary)
      }
    }
    //bottom
    if ((id + edge) <= 80) {
      const nearLetter = document.getElementById(`C${id + edge}`).textContent;
      const newWord = word + nearLetter;
      const newDictionary = dictionary.filter((word) => word.startsWith(newWord));
      if (newDictionary.includes(newWord)) {
        wordsInGame.push(newWord);
      }
      if (newDictionary.length > 0) {
        inner(newWord, id + edge, newDictionary)
      }
    }
    //left
    if (id  % edge !== 0 && id - 1 >= 0) {
      const nearLetter = document.getElementById(`C${id - 1}`).textContent;
      const newWord = word + nearLetter;
      const newDictionary = dictionary.filter((word) => word.startsWith(newWord));
      if (newDictionary.includes(newWord)) {
        wordsInGame.push(newWord);
      }
      if (newDictionary.length > 0) {
        inner(newWord, id - 1, newDictionary)
      }
    }
  }
  inner(word, id, dictionary);
}

function getWordsinGame() {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell) => {
    checkLetter(cell, Dict, edge, wordsInGame);
  })
  const set = new Set(wordsInGame);
  uniqueWords = Array.from(set);
  console.log(uniqueWords);
}

setTimeout(getWordsinGame, 1000);

//кнопка назад
const prevButton = document.querySelector('.prev_button');
prevButton.addEventListener('click', () => {
  closePopup();
});

//кнопка играть
const nextButton = document.querySelector('.next_button');
nextButton.addEventListener('click', () => {
  location.reload();
  closePopup();
})