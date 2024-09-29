

let backgoundImage = document.querySelector(".backgroundImage");
const modalBlockForImages = document.querySelector(".modalBlockForImages");
const imageOpenButton = document.querySelector(".imagesOpenButton");
const closeButton = document.querySelector(".closeButton")

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
]

imagesData.forEach((img)=>{
    const imgBlock = document.createElement("div");
    imgBlock.classList.add("imgBlock")
    let imgTag = document.createElement("img");
    imgBlock.appendChild(imgTag)
   imgTag.src = img.imageUrl

imgTag.addEventListener("click",()=>{
    backgoundImage.src = imgTag.src
})

   modalBlockForImages.appendChild(imgBlock)
})



 


