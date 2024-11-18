


let backgoundImage = document.querySelector(".backgroundImage");
const modalBlockForImages = document.querySelector(".modalBlockForImages");
const imageOpenButton = document.querySelector(".imagesOpenButton");
const closeButton = document.querySelector(".closeButton")
const message = document.querySelectorAll(".message");
const messageBlock = document.querySelector(".messageBlock")
imageOpenButton.addEventListener("click",()=>{
    modalBlockForImages.classList.add("active");
})
closeButton.addEventListener("click",()=>{
    modalBlockForImages.classList.remove("active");
})

let imagesData = [
{
id: 1,
imageUrl: "https://baldezh.top/uploads/posts/2021-04/1617477896_2-p-oboi-nezhnii-zakat-2.jpg"
},
{
id: 2,
imageUrl: "https://kartin.papik.pro/uploads/posts/2023-06/thumbs/1687869064_kartin-papik-pro-p-kartinki-vertikalnie-na-telefon-more-zakat-15.jpg",
},
{
id: 3,
imageUrl: "https://images8.alphacoders.com/136/thumb-1920-1360352.png",
},
{
id: 4,
imageUrl: "https://hotwalls.ru/thumbnails/lg/potryasayushchiy_zakat_nad_morem.jpg",
},
{
id: 5,
imageUrl: "https://m.media-amazon.com/images/I/81VBi2RDh6L.jpg",
},
{
id: 6,
imageUrl: "https://corporate.walmart.com/content/corporate/en_us/purpose/sustainability/planet/nature/jcr:content/par/image_2_0.img.png/1693432526985.png",
},
{
id: 7,
imageUrl: "https://images.squarespace-cdn.com/content/v1/5d777de8109c315fd22faf3a/1693407136044-G90XQURX1GABMYGAS8K1/shutterstock_1288634614.jpg?format=2500w",
},
{
id: 8,
imageUrl: "https://c4.wallpaperflare.com/wallpaper/189/758/369/armenia-yerevan-city-mountain-wallpaper-preview.jpg",
},
{
id: 9,
imageUrl: "https://www.pixelstalk.net/wp-content/uploads/image10/Nature-wallpaper-HD-with-autumn-forest-with-vibrant-red-and-orange-leaves-sunlight-streaming-through-the-canopy.jpg",
},
{
id: 10,
imageUrl: "https://getwallpapers.com/wallpaper/full/b/2/e/394131.jpg",
},
{
id: 11,
imageUrl: "https://plus.unsplash.com/premium_photo-1669295395766-bfa4f6b347a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
{
id: 12,
imageUrl: "https://images.unsplash.com/photo-1518699086072-d567cb15b483?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
]

imagesData.forEach((img)=>{
    const imgBlock = document.createElement("div");
    imgBlock.classList.add("imgBlock")
    let imgTag = document.createElement("img");
    imgBlock.appendChild(imgTag)
   imgTag.src = img.imageUrl

imgTag.addEventListener("click",()=>{
    
    backgoundImage.style.backgroundImage = `url(${imgTag.src})`;
    const randomIndex = Math.floor(Math.random() * message.length)
    message[randomIndex].classList.add("active")
    messageBlock.classList.add("active")
   setTimeout(() => {
    modalBlockForImages.classList.remove("active")
    message[randomIndex].classList.remove("active")
    messageBlock.classList.remove("active")
   }, 3500);
})

   modalBlockForImages.appendChild(imgBlock)
})


 


