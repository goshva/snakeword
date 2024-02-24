var edge = getParameterByName("edge");
var letters = getParameterByName("letters").split("");
console.log(letters);
var userwordsids = JSON.parse(getParameterByName("userwordsids"));

function parseWordsfromUrl() {
  if (userwordsids != null) {
    for (var i = 0; i < userwordsids.length; i++) {
      var iTem = userwordsids[i];

      for (var j = 0; j < iTem.length; j++) {
        var id = iTem[j];
        collectWord(letters[id], id);
      }
      word = "";
    }

    //         clear();
  }
}
//  http://localhost:1313/url?edge=9&letters=araattantrnertnpteopefhnnttieltlsoahkleispthepoonilelmnrtnohuphlacshddprflioewnrr&userwordsids=[[37,46,47],[56,47,46],[56,47,46,37]]
/* Get save data from localstorage

var edge = []
var letters = []
var userwordsids= []
function parseWordsfromLocalStorage(){
edge = localStorage.getItem('edge');
letters = localStorage.getItem('letters');//.split('');
userwordsids= JSON.parse(localStorage.getItem('userwordsids'));
if (userwordsids != null){
    for (var i = 0; i< userwordsids.length; i++){
         var iTem = userwordsids[i];         
         for (var j = 0; j< iTem.length; j++){
         var id = iTem[j];
         collectWord(letters[id],id)
         };
    word= "";
    }
}
*/
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function genArray() {
  genArea();
  //    history.pushState('', document.title, window.location.pathname); //clear url from params
}

var gameplace = document.getElementById("gameplace");

function genArea() {
  for (var L = 0; L < letters.length; L++) {
    var divbtn = document.createElement("DIV");
    divbtn.className = "cell";
    divbtn.id = "C" + L;
    divbtn.style.zIndex = "10";
    divbtn.Letter = letters[L];
    divbtn.LetterCount = L;
    divbtn.onclick = function () {
      collectWord(this.Letter, this.LetterCount);
      this.className += " activeCell";
    };
    var t = document.createTextNode(letters[L]);
    divbtn.appendChild(t);
    gameplace.appendChild(divbtn);
  }
}

genArray();
