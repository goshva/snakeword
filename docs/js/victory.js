
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
//timer
// document.addEventListener('DOMContentLoaded', function () {

//     const modalBlock = document.querySelector(".modalBlock")
//     const StartBtn = document.querySelector(".StartBtn");
//   // timer id

//   // 1 minute timer
//   // last value can be easily changed, depends on how many minutes you need
  
//   let deadline = 1000 * 60 * 10;
//   let timerId = null;

//   StartBtn.addEventListener("click",countdownTimer);
//   // set remaining time as content of elements
//   function countdownTimer() {
//     const $minutes = document.querySelector('.timer__minutes');
//     const $seconds = document.querySelector('.timer__seconds');
//     let audio = document.createElement("audio");
//     let audioSrc = document.createElement("source");
// audio.setAttribute("type","audio/wav")
//     if (deadline === 0) {
//       const popup = document.querySelector('.b-popup');
//       popup.style.display = 'block';
//       popup.style.opacity = 1;
   

//       audioSrc.src = "/audios/mixkit-arcade-retro-game-over-213.wav";
//       audio.appendChild(audioSrc)
//       audio.play()


//     } 
//       modalBlock.classList.add("active")
//       StartBtn.classList.add("active")
//       audioSrc.src = "/audios/mixkit-fast-small-sweep-transition-166.wav";
//       audio.appendChild(audioSrc)
//       audio.play()
//       document.body.appendChild(audio)

//       timerId  = setInterval(()=>{
     
        
//           const minutes = deadline > 0 ? parseInt(deadline / 1000 / 60) % 60 : 0;
//           const seconds = deadline > 0 ? parseInt(deadline / 1000) % 60 : 0;
//           $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
//           $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
//           deadline -= 1000;
    

//       },1000)   
//   }
  
  
// });

document.addEventListener('DOMContentLoaded', function () {
  // timer id
  let timerId = null;
  // 1 minute timer
  // last value can be easily changed, depends on how many minutes you need
  let deadline = 1000 * 60 * 10;
    const modalBlock = document.querySelector(".modalBlock")
    const StartBtn = document.querySelector(".StartBtn");

      StartBtn.addEventListener("click",countdownTimer);

  // set remaining time as content of elements
  function countdownTimer() {
    if (deadline === 0) {
      const popup = document.querySelector('.b-popup');
      popup.style.display = 'block';
      popup.style.opacity = 1;
      let audio = document.createElement("audio");
   let audioSrc = document.createElement("source");
   audioSrc.src = "/audios/mixkit-arcade-retro-game-over-213.wav";
         audio.appendChild(audioSrc)
         audio.play()
         document.body.appendChild(audio)
    }
    
    else{
      const $minutes = document.querySelector('.timer__minutes');
      const $seconds = document.querySelector('.timer__seconds');
      modalBlock.classList.add("active")
      StartBtn.classList.add("active")
    const minutes = deadline > 0 ? Math.floor(deadline / 1000 / 60) % 60 : 0;
    const seconds = deadline > 0 ? Math.floor(deadline / 1000) % 60 : 0;
    $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    // decrease remaining time by one second
    deadline -= 1000;
    timerId = setInterval(countdownTimer, 1000);
    let audio = document.createElement("audio");
    let audioSrc = document.createElement("source");
    audioSrc.src = "/audios/mixkit-fast-small-sweep-transition-166.wav";
          audio.appendChild(audioSrc)
          audio.play()
          document.body.appendChild(audio)
  }
  // get elememts, containing time components

  
  // call countdownTimer function

  // set countdownTimer function every second

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
  