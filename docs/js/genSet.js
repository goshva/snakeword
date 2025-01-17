


var edge = 9;
var track = [];
var letters = [];
var lettersFree = [];
for (var i = 0; i < edge * edge; i++) {
  letters[i] = i;
}
var genwords = [];









function getFreePosition() {
  for (var i = 0; i < letters.length; i++) {
    if (!isNaN(letters[i]) && lettersFree.indexOf(letters[i]) == -1) {
      lettersFree.push(letters[i]);

    }
  }
  freepositionindex = getRandomInt(0, lettersFree.length);
  position = lettersFree[freepositionindex];
  //  console.log(lettersFree.length +" FREE");
  lettersFree = [];

  return position;
}
function getNear(i) {
  var neaArr = [];
  if (i >= edge) {
    if (!isNaN(letters[i - edge])) {
      neaArr.push(letters[i - edge]);
    }
  } //up
  if ((i + 1) % edge !== 0) {
    if (!isNaN(letters[i + 1])) {
      neaArr.push(letters[i + 1]);
    }
  } // right
  if (i < edge * edge - edge) {
    if (!isNaN(letters[i + edge])) {
      neaArr.push(letters[i + edge]);
    }
  } //bottom
  if (i % edge !== 0) {
    if (!isNaN(letters[i - 1])) {
      neaArr.push(letters[i - 1]);
    }
  } //left
  return neaArr;
}
//
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function snakeWord(position, i, word, track) {
  //var letter = testword[i];
  var letter = word[i];
  letters[position] = letter;
  position = getNear(position)[getRandomInt(0, getNear(position).length)];
  if (position) {
    i++;
    if (i < word.length) {
      track.push(position);
      snakeWord(position, i, word, track);
    }
    if (i == word.length) {
      genwords.push(word);

    }
  } else {
    //letters[position] = track[i];
    for (var i = 0; i < track.length; i++) {
      letters[track[i]] = track[i]; //this trash TODO: need rewite getNear() function
    }
  }

}

function GetRandomLetter() {
  var letter = getRandomInt(0, letters);
  var Alphabetcount = 0;
  for (var j = 0; j < Rangs.length; j++) {
    if (letter - Rangs[j] >= 0) {
      letter = letter - Rangs[j];
      Alphabetcount++;
      console.log(Alphabetcount);
    } else {
      return Alphabet[Alphabetcount];
    }
  }

}


function insertRandomLetters() {


  for (var i = 0; i < letters.length; i++) {
    if (!isNaN(letters[i])) {
      letters[i] = GetRandomLetter();
    }
  }
}
/// END random generator block
function playSound() {
  var audio = new Audio("../sounds/click.mp3");
  audio.play();
}
function genArray(testwords) {
  for (var i = 0; i < testwords.length; i++) {
    // console.log(testwords[i], i);
    track = [];
    track[0] = getFreePosition();
    if (testwords[i]) {
      snakeWord(track[0], 0, testwords[i], track);

    }
  }
  console.log(genwords)

  //  lastWord = genwords 
  insertRandomLetters();
  genArea();

}

var gameplace = document.getElementById("gameplace");

function genArea() {
  let [lettersStr, userwordids] = location.search.replace("?", "").split("&");

  letters = lettersStr
    ? decodeURIComponent(lettersStr.split("=")[1]).split("")
    : letters;

  findwordids = userwordids ? JSON.parse(userwordids.split("=")[1]) : [];


  for (var L = 0; L < letters.length; L++) {
    var divbtn = document.createElement("DIV");
    var language = getCookie("lang") || document.documentElement.lang;
    if (language == "ar" || language == "ar-AR" || language == "ar-ar") {
      divbtn.style.lineHeight = "0.9";
    }


    divbtn.className = "cell";
    divbtn.id = "C" + L;
    divbtn.style.zIndex = "10";
    divbtn.Letter = letters[L];
    divbtn.LetterCount = L;
    divbtn.onclick = function (e) {
      const toggleCellOpacity = () => {

        document.querySelectorAll(".cell").forEach(cell => {
          cell.style.opacity = "0.5";
          setTimeout(() => {
            cell.style.opacity = "1";
          }, 3000);
        });
        const currentIndex = parseInt(this.id.replace("C", ""), 10);
        //
        function getNextAvalible(idx) {
          console.log(idx, edge)
          listNextLettersAvalible = [];
          if (idx > edge) {
            listNextLettersAvalible.push(idx - edge)
          }
          if (idx + 1 % edge !== 0) {
            listNextLettersAvalible.push(idx + 1)
          }
          if (idx < edge * edge - edge) {
            listNextLettersAvalible.push(idx + edge)
          }
          if (idx - 1 % edge !== 0) {
            listNextLettersAvalible.push(idx - 1)
          }
          return listNextLettersAvalible;
        };
        //
        const neighbors = getNextAvalible(currentIndex);
        

        [currentIndex, ...neighbors].forEach(idx => {
          console.log(currentIndex)

          elIdx = document.getElementById("C" + idx)

          crossAvalible = getNextAvalible(idx);
          console.log(crossAvalible)
          elIdx.style.opacity = "1";
        });
      };
      const noClass = () => {
        collectWord(this.Letter, this.LetterCount);
        this.className += " activeCell";
        playSound(this.Letter);
        cutButton.style.pointerEvents = "auto";
        cutButton.style.opacity = "1";

      }
      e.target.classList.contains('activeCell') === false ? noClass() : true;
      toggleCellOpacity()
    };
    var t = document.createTextNode(letters[L]);
    divbtn.appendChild(t);
    gameplace.appendChild(divbtn);
  }



  if (Array.isArray(findwordids) && Array.isArray(findwordids[0])) {
    for (var i = 0; i < findwordids.length; i++) {
      for (var j = 0; j < findwordids[i].length; j++) {
        collectWord(letters[findwordids[i][j]], findwordids[i][j], true);

      }
      clear();
    }
  }
}
