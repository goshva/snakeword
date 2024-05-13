const imageBtn = document.querySelector(".imageBtn");
const imageItems = document.querySelectorAll(".image-list-item>a>img");
const imageList = document.querySelector(".image-list");
const body = document.querySelector("body")
imageBtn.addEventListener("click",()=>{
    imageList.classList.toggle("active");
})

imageItems.forEach((img,index)=>{
    img.addEventListener("click",()=>{
        alert(`index is${index}`)
    })
})