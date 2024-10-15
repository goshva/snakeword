const ThemeButton = document.querySelector(".ThemeButton");
const topMenu = document.querySelector(".top-menu");
const findedWordsBlock = document.querySelector(".findedWordsBlock")
const lightRateBlock = document.querySelector(".rateBlock")
const buttonBlock = document.querySelector(".buttonBlock");
const wordSpan = document.querySelector(".wordSpan")
  ThemeButton.addEventListener("click",()=>{
  if(localStorage.getItem("themes") === "light"){
    localStorage.removeItem("themes")
  }else{
    localStorage.setItem("themes","light")
  }

  changeDarkToLight()
})

function changeDarkToLight(){
  
  if (localStorage.getItem("themes") === "light") {
    ThemeButton.classList.add("light")
    ThemeButton.innerHTML = '<i class="fa-regular fa-sun"></i>'
    topMenu.classList.add("light")
    findedWordsBlock.classList.add("light")
    lightRateBlock.classList.add("light")
    buttonBlock.classList.add("light")
  wordSpan.classList.add("light")
  }else{
    ThemeButton.classList.remove("light")
    ThemeButton.innerHTML = '<i class="fa-regular fa-moon"></i>'
    topMenu.classList.remove("light")
    findedWordsBlock.classList.remove("light")
    lightRateBlock.classList.remove("light")
    buttonBlock.classList.remove("light")
    wordSpan.classList.add("light")
  }
}


changeDarkToLight()


// if click arrow icon open languages menu



buttonBlock.addEventListener("click",()=>{
  buttonBlock.classList.toggle("active")
  topMenu.classList.toggle("active")
})
