const rateBlock = document.querySelector(".rateBlock")
const rateButtons = document.querySelectorAll(".rateBtn")
const rateButtonsBlock = document.querySelector(".rateBtns")
const choosenBlock = document.querySelector(".choosenBlock");
const choosen_icon = document.querySelector(".choosen_icon")
const LS = localStorage
const storageNum = 0
LS.getItem("rateNumber")
rateButtons.forEach((button,index)=>{
    button.addEventListener("click",()=>{
    storageNum = index + 1
    LS.setItem("rateNumber",storageNum)
     rateButtonsBlock.classList.add("rated");
     choosenBlock.classList.add("rated");
     choosen_icon.innerHTML = button.innerHTML
     setTimeout(()=>{
rateBlock.classList.remove("deleted")
     },3000)
    })
})