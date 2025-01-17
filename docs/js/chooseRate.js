const rateBlock = document.querySelector(".rateBlock")
const rateButtons = document.querySelectorAll(".rateBtn")
const rateButtonsBlock = document.querySelector(".rateBtns")
const choosenBlock = document.querySelector(".choosenBlock");
const choosen_icon = document.querySelector(".choosen_icon")
const rateHeader = document.querySelector(".rateHeader")
const ratedText = document.querySelector(".ratedText")
const LS = localStorage
let storageNum = 0
LS.getItem("rateNumber")
rateButtons.forEach((button,index)=>{
    button.addEventListener("click",()=>{
    storageNum = index + 1
    LS.setItem("rateNumber",storageNum)
     rateButtonsBlock.classList.add("rated");
     choosenBlock.classList.add("rated");
     rateHeader.classList.add("deleted");
     ratedText.classList.add("thanks")
     choosen_icon.innerHTML = button.innerHTML
     setTimeout(()=>{
rateBlock.classList.remove("deleted")
     },3000)
    })
})