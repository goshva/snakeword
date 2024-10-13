const ThemeButton = document.querySelector(".ThemeButton");
const topMenu = document.querySelector(".top-menu");
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
    topMenu.classList.add(".light")
  }else{
    ThemeButton.classList.remove("light")
    topMenu.classList.remove(".light")
    ThemeButton.innerHTML = '<i class="fa-regular fa-moon"></i>'
  }
}


changeDarkToLight()


// if click arrow icon open languages menu


const buttonBlock = document.querySelector(".buttonBlock");
buttonBlock.addEventListener("click",()=>{
  buttonBlock.classList.toggle("active")
  topMenu.classList.toggle("active")
})
