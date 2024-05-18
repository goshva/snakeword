let imageBtn = document.querySelector(".imageBtn");
let imageItems = document.querySelectorAll(".image_item");
let imageList = document.querySelector(".image-list");
let backgoundImage = document.querySelector(".backgoundImage")
imageBtn.addEventListener("click",()=>{
    imageList.classList.toggle("active");
    imageBtn.classList.toggle("active")
})

imageItems.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        alert(index)
        item.src =  backgoundImage.src
    })
})