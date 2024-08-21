const hamburgerBlockBtn = document.querySelector(".hamburgerBlockBtn");
const iconBlock = document.querySelector(".iconBlock");
const navigationBar = document.querySelector(".navigationBar")
hamburgerBlockBtn.addEventListener("click",()=>{
    iconBlock.classList.toggle("active")
    navigationBar.classList.toggle("active")
})


// light Dark Toggle


const lightBlock = document.querySelector(".lightDarkBlock")
const toggleCircle = document.querySelector(".toggleCircle");
 lightBlock.addEventListener("click",()=>{
    toggleCircle.classList.toggle("active")
 })