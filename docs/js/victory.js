



const rulesBtn = document.querySelector(".RulesBtn");
rulesBtn.addEventListener("click",()=>{
 let modalSlider = document.createElement("div");
 modalSlider.className = "modalSlider";
})



const wordsInGame = [];
//timer
document.addEventListener('DOMContentLoaded', function () {

    const modalBlock = document.querySelector(".modalBlock")
    const StartBtn = document.querySelector(".StartBtn");
  // timer id
  let timerId = null;
  // 1 minute timer
  // last value can be easily changed, depends on how many minutes you need
  let deadline = 1000 * 60 * 10;


  StartBtn.addEventListener("click",countdownTimer);
  // set remaining time as content of elements
  function countdownTimer() {
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
        if (deadline === 0) {
            const popup = document.querySelector('.b-popup');
            popup.style.display = 'block';
            popup.style.opacity = 1;
          }else{
            modalBlock.classList.add("active")
            StartBtn.classList.add("active")
            timerId  = setInterval(()=>{
                const minutes = deadline > 0 ? parseInt(deadline / 1000 / 60) % 60 : 0;
                const seconds = deadline > 0 ? parseInt(deadline / 1000) % 60 : 0;
                $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
                $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
                deadline -= 1000;
            },1000)
          }
          
 
         
        
        
  }
  
  
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
    console.log(wordsInGame)
  }

  setTimeout(getWordsinGame, 1000);
  