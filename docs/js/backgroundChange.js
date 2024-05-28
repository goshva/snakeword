let imageBtn = document.querySelector(".imageBtn");
let imageList = document.querySelector(".image-list");
let backgoundImage = document.createElement("img");
backgoundImage.classList.add("backgoundImage");
let body = document.querySelector("body")
imageBtn.addEventListener("click",()=>{
    imageList.classList.toggle("active");
    imageBtn.classList.toggle("active")
})

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

const randomIndex = Math.floor(Math.random() * imagesData.length);
backgoundImage.src = imagesData[randomIndex];
body.appendChild(backgoundImage)