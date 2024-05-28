

let backgoundImage = document.createElement("img");
backgoundImage.classList.add("backgoundImage");
let body = document.querySelector("body")


let imagesData = [
    "/backgroundImages/zakat-i-rassvet-1200x801px.jpg",
    "/backgroundImages/zakat-i-rassvet-1280x853px.jpg",
    "/backgroundImages/zakat-i-rassvet-2000x1333px.jpg",
        "/backgroundImages/zakat-i-rassvet-2056x1365px.jpg",
]

const randomIndex = Math.floor(Math.random() * imagesData.length);
backgoundImage.src = imagesData[randomIndex];
body.appendChild(backgoundImage)