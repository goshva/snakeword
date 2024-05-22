let imageBtn = document.querySelector(".imageBtn");
let imageList = document.querySelector(".image-list");
let backgoundImage = document.createElement("img");
backgoundImage.classList.add("backgoundImage");
let body = document.querySelector("body")
imageBtn.addEventListener("click",()=>{
    imageList.classList.toggle("active");
    imageBtn.classList.toggle("active")
})

backgoundImage.src = "./../img/bcg.jpg"
let imagesData = [
    {
        id:1,
        image:"/backgroundImages/zakat-i-rassvet-1200x801px.jpg",
       
    }, 
    {
        id:2,
        image:"/backgroundImages/zakat-i-rassvet-1280x853px.jpg",
      
    },
    {
        id:3,
        image:"/backgroundImages/zakat-i-rassvet-2000x1333px.jpg",
        
    },
    {
        id:4,
        image:"/backgroundImages/zakat-i-rassvet-2056x1365px.jpg",
    },
]

imagesData.forEach((imgData,index)=>{

let imageItems = document.createElement("img");
imageItems.classList.add ("image_item");
imageItems.src = imgData.image
imageList.appendChild(imageItems)


imageItems.addEventListener("click",()=>{
    body.appendChild(backgoundImage)
   backgoundImage.src = imageItems.src
})
})