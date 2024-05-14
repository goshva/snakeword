const imageBtn = document.querySelector(".imageBtn");
const imageItems = document.querySelectorAll(".image-list-item > img");
const imageList = document.querySelector(".image-list");
const body = document.querySelector("body")
imageBtn.addEventListener("click",()=>{
    imageList.classList.toggle("active");
    imageBtn.classList.toggle("active")
})

imageItems.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        body.style.backgroundImage = `url(/backgroundImages/${item})`
        alert(index)
    })
})