
const closeBtn = document.querySelector(".closeBtn")
let content = document.querySelector(".content")
let modalSlider = document.querySelector(".modalSlider");
const rulesBtn = document.querySelector(".RulesBtn");


rulesBtn.addEventListener("click",()=>{
modalSlider.classList.add("active");
})

closeBtn.addEventListener("click",()=>{
  modalSlider.classList.remove("active")
})



const wordsInGame = [];


document.addEventListener('DOMContentLoaded', function () {
  const restartBtn = document.querySelector(".b-popup  .restartBtn")      
  

 restartBtn.addEventListener("click",()=>{
alert("ds")

 })




  // timer id
  let timerId = null;
  // 1 minute timer
  // last value can be easily changed, depends on how many minutes you need
  let deadline = 1000 * 60 * 10;
    const modalBlock = document.querySelector(".modalBlock")
    const StartBtn = document.querySelector(".StartBtn");
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    const popup = document.querySelector('.b-popup');
    let audio = document.createElement("audio");
    let audioSrc = document.createElement("source");
      StartBtn.addEventListener("click",()=>{
      
        modalBlock.classList.add("active")
        StartBtn.classList.add("active")
        
          audioSrc.src = "/audios/mixkit-fast-small-sweep-transition-166.wav";
                audio.appendChild(audioSrc)
                audio.play()
                document.body.appendChild(audio)
                setTimeout(()=>{
                  audio.pause()
                 },1000)
                 
      
          
        // decrease remaining time by one second
        timerId = setInterval(()=>{
         
        
        const minutes = deadline > 0 ? Math.floor(deadline / 1000 / 60) % 60 : 0;
        const seconds = deadline > 0 ? Math.floor(deadline / 1000) % 60 : 0;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        deadline -= 1000;
        if (minutes === 0 && seconds === 0) {  
          

          popup.classList.add("active")
            restartBtn.classList.add("active") 
              }
        },1000);
      

      });

  // set remaining time as content of elements



    
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
  