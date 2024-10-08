const ThemeButton = document.querySelector(".ThemeButton");
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
  }else{
    ThemeButton.classList.remove("light")
    ThemeButton.innerHTML = '<i class="fa-regular fa-moon"></i>'
  }
}


changeDarkToLight()


// if click arrow icon open languages menu


const buttonBlock = document.querySelector(".buttonBlock");
const topMenu = document.querySelector(".top-menu");
buttonBlock.addEventListener("click",()=>{
  buttonBlock.classList.toggle("active")
  topMenu.classList.toggle("active")
})
