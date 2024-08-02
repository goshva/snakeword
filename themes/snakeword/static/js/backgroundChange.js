

let backgoundImage = document.createElement("img");
backgoundImage.classList.add("backgoundImage");
let body = document.querySelector("body")


let imagesData = [
    "https://baldezh.top/uploads/posts/2021-04/1617477896_2-p-oboi-nezhnii-zakat-2.jpg",
    "https://kartin.papik.pro/uploads/posts/2023-06/thumbs/1687869064_kartin-papik-pro-p-kartinki-vertikalnie-na-telefon-more-zakat-15.jpg",
    "https://kartin.papik.pro/uploads/posts/2023-06/thumbs/1687843247_kartin-papik-pro-p-kartinki-zakati-i-rassveti-na-more-40.jpg",
    "https://hotwalls.ru/thumbnails/lg/potryasayushchiy_zakat_nad_morem.jpg",
    "../../img/bcg.jpg",
    "https://s11.stc.yc.kpcdn.net/share/i/12/11500660/wr-960.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT97cyPnK7jDF1IFtxH-jMYSa6elpZJJ0nx2ECsIlxWLTqUtPhujzc4et2fvmKSM6oDt2o&usqp=CAU",
    "https://corporate.walmart.com/content/corporate/en_us/purpose/sustainability/planet/nature/jcr:content/par/image_2_0.img.png/1693432526985.png",
    "https://images.squarespace-cdn.com/content/v1/5d777de8109c315fd22faf3a/1693407136044-G90XQURX1GABMYGAS8K1/shutterstock_1288634614.jpg?format=2500w"

]

const randomIndex = Math.floor(Math.random() * imagesData.length);
backgoundImage.src = imagesData[randomIndex];
body.appendChild(backgoundImage);



// change toggle icons 


const hamburgerBlockBtn = document.querySelector(".hamburgerBlockBtn");
const iconBlock = document.querySelector(".iconBlock");

hamburgerBlockBtn.addEventListener("click",()=>{
    iconBlock.classList.add("active")
})