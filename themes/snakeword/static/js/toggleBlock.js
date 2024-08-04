const hamburgerBlockBtn = document.querySelector(".hamburgerBlockBtn");
const iconBlock = document.querySelector(".iconBlock");
const navigationBar = document.querySelector(".navigationBar")
hamburgerBlockBtn.addEventListener("click",()=>{
    iconBlock.classList.toggle("active")
    navigationBar.classList.toggle("active")
})