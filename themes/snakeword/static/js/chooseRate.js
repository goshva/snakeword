const rateBlock = document.querySelector(".rateBlock")
const rateButtons = document.querySelectorAll(".rateBtn")
const rateButtonsBlock = document.querySelector(".rateBtns")
const choosenBlock = document.querySelector(".choosenBlock");
const choosen_icon = document.querySelector(".choosen_icon")

rateButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
     rateButtonsBlock.classList.add("rated");
     choosenBlock.classList.add("rated");
     choosen_icon.innerHTML = button.innerHTML
     setTimeout(()=>{
rateBlock.classList.remove("deleted")
     },3000)
    })
})