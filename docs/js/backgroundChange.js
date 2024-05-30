

let backgoundImage = document.createElement("img");
backgoundImage.classList.add("backgoundImage");
let body = document.querySelector("body")


let imagesData = [
    "/backgroundImages/zakat-i-rassvet-1200x801px.jpg",
    "/backgroundImages/zakat-i-rassvet-1280x853px.jpg",
    "/backgroundImages/zakat-i-rassvet-2000x1333px.jpg",
    "/backgroundImages/zakat-i-rassvet-2056x1365px.jpg",
    "../../img/bcg.jpg",
    "/backgroundImages/depositphotos_403636008-stock-photo-colourful-sunset-beach-atlantic-ocean.jpg",
    "/backgroundImages/images.jpg",
    "/backgroundImages/images_2.jpg",
    "/backgroundImages/images_2.jpg",
]

const randomIndex = Math.floor(Math.random() * imagesData.length);
backgoundImage.src = imagesData[randomIndex];
body.appendChild(backgoundImage)