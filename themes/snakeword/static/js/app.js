window.addEventListener("keypress", start, false);
function checkKeyPressed(e) {
    if (e.keyCode == "109") {
        start()
    }
}


///
window.addEventListener("keypress", plusLike, false);


function checkKeyPressed(e) {
    if (e.keyCode == "107") {
        plusLike()
    }
}

function plusLike() {
    var elements = document.getElementsByClassName('_4arz');
    var requiredElement = elements[1];

    count = parseInt(requiredElement.innerText)
    count++
    requiredElement.id ="scrollto" 
    requiredElement.innerText = count
}
///
url = "https://snakeword.ru/img/leadzaScrcast/Announcement feature 2."
urlEnd = ".png"

function quetch(slide) {
    return (url + slide + urlEnd)
}

function sliderman(url) {
    document.querySelector("#globalContainer").style.display = "none"
    pixels = document.body.offsetWidth
    var myImage = new Image(pixels);
    myImage.src = url;
    myImage.id = "slideActiv"
    document.body.appendChild(myImage);

}

function destroer() {
    try {
        document.querySelector("#slideActiv").remove();

    } catch (e) {
        console.log(e)
    }
}

function triggerBoard() {
    console.log(document.querySelector("#globalContainer").style.display)
    var opacity = document.querySelector("#globalContainer").style.display
    if (document.querySelector("#globalContainer").style.display == "none") {
        opacity = "block"
    }
    if (document.querySelector("#globalContainer").style.display == "block") {
        opacity = "none"
    }
    document.querySelector("#globalContainer").style.display = opacity
    console.log("after:" + document.querySelector("#globalContainer").style.display)
}

document.querySelector("#globalContainer").style.display = "block"

var slideTimeing = [3, 8, 13, 17, 19, 33, 38, 40, 58]
var castTimeing = [5, 10, 15, 19, 22, 35, 40, 42, 60]
var j = 0
var refreshIntervalId;

function start() {
    destroer()
    window.scrollTo( 0, 1000 );
    triggerBoard()
    refreshIntervalId = setInterval(function() {
        console.log("time: " + j++)
        slide = slideTimeing.indexOf(j);
        cast = castTimeing.indexOf(j);
        if (slide > -1) {
            //console.log("show slider #" + (slide + 2))
            triggerBoard()
            sliderman(quetch(slide + 2))
        }
        if (cast > -1) {
            //console.log("hide slider ")
            destroer()
            if (j != 19) {
                triggerBoard()
            }
        }

    }, 1000);

}

//
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}
//

sliderman("https://snakeword.ru/img/leadzaScrcast/Announcement%20feature%202.1.png")