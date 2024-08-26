

let backgoundImage = document.createElement("img");
backgoundImage.classList.add("backgoundImage");
let body = document.querySelector("body")


let imagesData = [
    "https://baldezh.top/uploads/posts/2021-04/1617477896_2-p-oboi-nezhnii-zakat-2.jpg",
    "https://kartin.papik.pro/uploads/posts/2023-06/thumbs/1687869064_kartin-papik-pro-p-kartinki-vertikalnie-na-telefon-more-zakat-15.jpg",
    "https://c4.wallpaperflare.com/wallpaper/33/261/282/5bd28eeaec175-wallpaper-preview.jpg",
    "https://hotwalls.ru/thumbnails/lg/potryasayushchiy_zakat_nad_morem.jpg",
    "../../img/bcg.jpg",
    "https://m.media-amazon.com/images/I/81VBi2RDh6L.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgvMyPvUfgjPyLZO5lNzzWC_CwEem6jMRxIQ&s",
    "https://corporate.walmart.com/content/corporate/en_us/purpose/sustainability/planet/nature/jcr:content/par/image_2_0.img.png/1693432526985.png",
    "https://images.squarespace-cdn.com/content/v1/5d777de8109c315fd22faf3a/1693407136044-G90XQURX1GABMYGAS8K1/shutterstock_1288634614.jpg?format=2500w",
    "https://c4.wallpaperflare.com/wallpaper/189/758/369/armenia-yerevan-city-mountain-wallpaper-preview.jpg",
    "https://www.pixelstalk.net/wp-content/uploads/image10/Nature-wallpaper-HD-with-autumn-forest-with-vibrant-red-and-orange-leaves-sunlight-streaming-through-the-canopy.jpg",
    "https://getwallpapers.com/wallpaper/full/b/2/e/394131.jpg",
]

const randomIndex = Math.floor(Math.random() * imagesData.length);
backgoundImage.src = imagesData[randomIndex];
body.appendChild(backgoundImage);


 


