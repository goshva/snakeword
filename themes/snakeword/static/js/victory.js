//timer
document.addEventListener('DOMContentLoaded', function() {
  // timer id
  let timerId = null;
  // 1 minute timer
  // last value can be easily changed, depends on how many minutes you need
  let deadline = 1000 * 60 * 10;

  // set remaining time as content of elements
  function countdownTimer() {
    if (deadline === 0) {
      const popup = document.querySelector('.b-popup');
      popup.style.visibility = 'visible';
      popup.style.opacity = 1;
    }
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
function checkLetter(cell, dictionary, edge, words) {
    const idStr = cell.id
    const id = Number(idStr.slice(1));
    const word = cell.textContent;
    function inner(word, id) {

      //top
      if ((id - edge) >= 0) {
        const nearLetter = document.getElementById(`${id - edge}`);
        const newWord = word + nearLetter;
        if (dictionary.includes(newWord)) {
          words.push(newWord);
        }
        dictionary.forEach((word) => {
          if (word.str.startsWith(newWord)) {
            inner(newWord, id - edge)
          }
        })
      }
      //right
      if ((id + 1) % 8 !== 0 && id + 1 <= 80) {
        const nearLetter = document.getElementById(`C${id + 1}`).textContent;
        const newWord = word + nearLetter;
        if (dictionary.includes(newWord)) {
          words.push(newWord);
        }
        dictionary.forEach((word) => {
          if (word.startsWith(newWord)) {
            inner(newWord, id + 1)
          }
        }) 
      }
      //bottom
      if ((id + edge) <= 80) {
        const nearLetter = document.getElementById(`${id + edge}`);
        const newWord = word + nearLetter;
        if (dictionary.includes(newWord)) {
          words.push(newWord);
        }
        dictionary.forEach((word) => {
          if (word.startsWith(newWord)) {
            inner(newWord, id + edge)
          }
        })
      }
      //left
      if ((id - 1) % 9 !== 0 && id - 1 >= 0 || id - 1 === 0) {
        const nearLetter = document.getElementById(`${id - 1}`);
        const newWord = word + nearLetter;
        if (dictionary.includes(newWord)) {
          words.push(newWord);
        }
        dictionary.forEach((word) => {
          if (word.startsWith(newWord)) {
            inner(newWord, id - 1)
          }
        }) 
      }
    }
    inner(word, id);
    console.log(words);
  }
  
  function victory() {
    edge = 9;
    count = 0;
    const words = [];
    const cells = document.querySelectorAll('.cell');
  
    cells.forEach((cell) => {
      checkLetter(cell, Dict, edge, words);
    })
  }

  // setTimeout(victory, 1900);
  