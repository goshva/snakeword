
const languageButton = document.querySelector(".languageButton");
const modalBlockForLanguage = document.querySelector(".modalBlockForLanguage")
languageButton.addEventListener("click",()=>{
modalBlockForLanguage.classList.toggle("active")
})

// light Dark Toggle



  const lightBlock = document.querySelectorAll(".lightDarkBlock");
  const toggleCircle = document.querySelectorAll(".toggleCircle");
const iconToggle = document.querySelectorAll(".iconToggle");
 const topMenu = document.querySelector(".top-menu")
 const top_menu_item =document.querySelectorAll(".top-menu-item");
 const setting_item = document.querySelector(".setting-item");
 const modalLight = document.querySelector(".modalBlock");
 const languageList = document.querySelector(".for_language");


 lightBlock.forEach((lightCheck,lightIndex)=>{
lightCheck.addEventListener("click",()=>{
  if(localStorage.getItem("themes") === "light"){
    localStorage.removeItem("themes")
  }else{
    localStorage.setItem("themes","light")
  }

  changeDarkToLight()
})

function changeDarkToLight(){
  
  if (localStorage.getItem("themes") === "light") {
    lightCheck.classList.add("light")
    toggleCircle[lightIndex].classList.add("light")
    iconToggle[lightIndex].classList.add("light");
   topMenu.classList.add("light")
    top_menu_item.forEach((item)=>{
      item.classList.add("light")
    })
    setting_item.classList.add("light");
     modalLight.classList.add("light");
     languageList.classList.add("light")
     hamburgerBlockBtn.classList.add("light")
  }else{
    lightCheck.classList.remove("light")
    toggleCircle[lightIndex].classList.remove("light")
    iconToggle[lightIndex].classList.remove("light")
    topMenu.classList.remove("light")
    top_menu_item.forEach((item)=>{
      item.classList.remove("light")
    })
    setting_item.classList.remove("light");
    modalLight.classList.remove("light");
    languageList.classList.remove("light");
    hamburgerBlockBtn.classList.remove("light")

  }
}


changeDarkToLight()
 })




