const changeImageButton = document.querySelector(".changeImageButton");
const modalblockForSelectImages = document.querySelector(".modalblockForSelectImages")


let imagesData = [
{
    id: 1,
    imageUrl:"https://kartin.papik.pro/uploads/posts/2023-06/thumbs/1687869064_kartin-papik-pro-p-kartinki-vertikalnie-na-telefon-more-zakat-15.jpg",
},
{
    id: 2,
    imageUrl:"https://images8.alphacoders.com/136/thumb-1920-1360352.png",
},
{
    id: 3,
    imageUrl:"https://hotwalls.ru/thumbnails/lg/potryasayushchiy_zakat_nad_morem.jpg",   
},
{
    id: 4,
    imageUrl:"https://m.media-amazon.com/images/I/81VBi2RDh6L.jpg",   
},
{
    id: 5,
    imageUrl:"https://images8.alphacoders.com/136/thumb-1920-1363709.png",   
},
{
    id: 6,
    imageUrl:"https://corporate.walmart.com/content/corporate/en_us/purpose/sustainability/planet/nature/jcr:content/par/image_2_0.img.png/1693432526985.png",   
},
{
    id: 7,
    imageUrl:"https://images.squarespace-cdn.com/content/v1/5d777de8109c315fd22faf3a/1693407136044-G90XQURX1GABMYGAS8K1/shutterstock_1288634614.jpg?format=2500w",   
},
{
    id: 8,
    imageUrl:"https://c4.wallpaperflare.com/wallpaper/189/758/369/armenia-yerevan-city-mountain-wallpaper-preview.jpg",   
},
{
    id: 9,
    imageUrl:"https://www.pixelstalk.net/wp-content/uploads/image10/Nature-wallpaper-HD-with-autumn-forest-with-vibrant-red-and-orange-leaves-sunlight-streaming-through-the-canopy.jpg",   
},
{
    id: 10,
    imageUrl:"https://getwallpapers.com/wallpaper/full/b/2/e/394131.jpg",   
},
]


changeImageButton.addEventListener("click",()=>{
    modalblockForSelectImages.classList.add("active")
})


let backgoundImage = document.createElement("img");
backgoundImage.classList.add("backgoundImage");
backgoundImage.src = "../img/GeneralImage.png"
let body = document.querySelector("body")
body.appendChild(backgoundImage)
let clickAudo = new Audio("../audios/mixkit-select-click-1109.wav")
imagesData.forEach((img)=>{
    let imageBlock = document.createElement("div");
    imageBlock.classList.add("imageBlock")
    let ImageTag = document.createElement("img");
    ImageTag.src = img.imageUrl

    ImageTag.addEventListener("click",()=>{
        clickAudo.play()
        let alertMessages = document.querySelectorAll(".alertMessages")
        let randomIndex = Math.floor(Math.random() * alertMessages.length) 
          alertMessages[randomIndex].classList.add("active")
          setTimeout(()=>{
            alertMessages[randomIndex].classList.remove("active")
          },3500)
    backgoundImage.src = ImageTag.src
    setTimeout(()=>{
        modalblockForSelectImages.classList.remove("active")
    },4500)
      
    })
   imageBlock.append(ImageTag);
   modalblockForSelectImages.append(imageBlock)

})






 


