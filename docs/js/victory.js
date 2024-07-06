const restartBtn = document.querySelector(".restartBtn")
const closeBtn = document.querySelector(".closeBtn")
let content = document.querySelector(".content")
let modalSlider = document.querySelector(".modalSlider");
const rulesBtn = document.querySelector(".RulesBtn");
rulesBtn.addEventListener("click",()=>{
modalSlider.classList.add("active");
let selectAudio = document.createElement("audio");
selectAudio.src = "/audios/mixkit-select-click-1109.wav";
selectAudio.play();
setTimeout(()=>{
  selectAudio.pause()
},1000);
modalSlider.appendChild(selectAudio)
})


closeBtn.addEventListener("click",()=>{
  modalSlider.classList.remove("active")
})
 


const wordsInGame = [];
//timer
document.addEventListener('DOMContentLoaded', function () {


  restartBtn.addEventListener("click", actionButton)
  function actionButton(){
  window.location.reload()
    popup.classList.remove("active");
    
  }



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
   const audio = document.createElement("audio");
   const timeAudio = document.createElement("audio");
     StartBtn.addEventListener("click",()=>{
       modalBlock.classList.add("active")
       StartBtn.classList.add("active")
       audio.src = "/audios/mixkit-fast-small-sweep-transition-166.wav";
               
               audio.play()
               document.body.appendChild(audio)
               setTimeout(()=>{
                 audio.pause()
                },1000)
                countDownTime()
     });
     
     function countDownTime(){
      timerId = setInterval(()=>{
    
   
        const minutes = deadline > 0 ? Math.floor(deadline / 1000 / 60) % 60 : 0;
        const seconds = deadline > 0 ? Math.floor(deadline / 1000) % 60 : 0;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        deadline -= 1000;
      

              if (minutes === 0 && seconds <=59) {
                 $minutes.style.color ="#f96800";
                $seconds.style.color = "#f96800"
              }

              if (minutes === 0 && seconds <=10) {
                $minutes.style.color ="red";
                $seconds.style.color = "red" 
                timeAudio.src = "/audios/mixkit-classic-alarm-995.wav";
                document.body.appendChild(timeAudio)
                timeAudio.play();
              
              }

              if (minutes === 0 && seconds === 0) {  
                popup.classList.add("active")
                clearInterval(timerId);
                const endAudio = document.createElement("audio");
               
                endAudio.src = "/audios/mixkit-video-game-win-2016.wav";
                
                popup.appendChild(endAudio)
                endAudio.play()
             
                    }
              
        },1000);
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
  