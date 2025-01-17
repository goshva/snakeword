const themesBlock = document.querySelector(".themesBlock");
const iconBlock = document.querySelector(".iconBlock");
const topMenu = document.querySelector(".top-menu");
const findedWordsBlock = document.querySelector(".findedWordsBlock")
const lightRateBlock = document.querySelector(".rateBlock")
const toggleBtn = document.querySelector(".toggleBtn");

themesBlock.addEventListener("click",()=>{
  if(localStorage.getItem("themes") === "light"){
    localStorage.removeItem("themes")
  }else{
    localStorage.setItem("themes","light")
  }

  changeDarkToLight()
})

function changeDarkToLight(){
  
  if (localStorage.getItem("themes") === "light") {
    iconBlock.classList.add("light")    
    topMenu.classList.add("light")
    findedWordsBlock.classList.add("light")
    lightRateBlock.classList.add("light")
    toggleBtn.classList.add("light")

    document.querySelectorAll(".carousel-caption").forEach((item)=>{
      item.classList.add("light")
    })
  }else{
    iconBlock.classList.remove("light") 
    topMenu.classList.remove("light")
    findedWordsBlock.classList.remove("light")
    lightRateBlock.classList.remove("light")
    toggleBtn.classList.remove("light")
 
    document.querySelectorAll(".carousel-caption").forEach((item)=>{
      item.classList.remove("light")
    })
  }
}


changeDarkToLight()


// if click arrow icon open languages menu



toggleBtn.addEventListener("click",()=>{
  toggleBtn.classList.toggle("active")
  topMenu.classList.toggle("active")
})
