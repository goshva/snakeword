

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

]

const randomIndex = Math.floor(Math.random() * imagesData.length);
backgoundImage.src = imagesData[randomIndex];
body.appendChild(backgoundImage)