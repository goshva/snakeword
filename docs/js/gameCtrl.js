var points = 0;
var word = "";
var ids = [];
var findwords = [];
var translatedwords = [];
var findwordids = [];
var opponentfindwords = [];
var socket = null;
//
function shownotify(text, Noteclass) {
  var notify = document.getElementById(Noteclass);
  notify.style.display = "block";
  //notify.innerText = text;
  setTimeout(hidenotify, 1900);
}
function hidenotify() {
  var notifies = document.getElementsByClassName("notify");
  for (var i = 0; i < notifies.length; i++) {
    notifies[i].style.display = "none";
  }
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(key) {
  var user = getCookie(key);
  if (user != "") {
    //alert("Welcome again " + user);
    setCookie(user, 0, 30);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 30);
    }
  }
}
//checkCookie("username")
///
function startmultiplayer() {
  var s = new WebSocket(
    `ws://localhost:8765/${encodeURIComponent(letters.join(""))}`
  );
  s.onopen = function (e) {
    console.info("ws opened");
    s.send(
      JSON.stringify({
        field: letters.join(""),
        findwordids,
      })
    );
  };
  s.onclose = function (e) {
    console.info("ws closed");
  };
  // s.onmessage = function (e) {
  //   var message = JSON.parse(e.data);

  //   console.log(message);
  //   // if (
  //   //   message.field == letters.join("") &&
  //   //   message.user != getCookie("username")
  //   // ) {
  //   //   BorderfromFindWord(message.word);
  //   //   shownotify(message.user + " +" + message.word.length);
  //   // }
  // };

  return s;
}
function BorderfromFindWord(arr) {
  for (var i = 0; i < arr.length; i++) {
    document.getElementById("C" + arr[i]).style.border = "thin solid #1f8dd6";
  }
}

function isFinded(word) {
  return findwords.indexOf(word);
}

function moreletter() {
  findwords.push(word);
  //findwordids.push(ids);//////////////////////////////////
  points += word.length;
  document.getElementById("points").innerText = points;
}

function nearCheck(id, ids) {
  var near = false;
  edge = parseInt(edge);
  console.log(edge)
  console.log(id)
  console.log(ids)

  id = parseInt(id);
  iTem = ids[ids.length - 2];
  if (iTem + 1 == id) {
    near = true;
    console.info(id, iTem);
  }
  if (ids.length === 1) {
    near = true;
    console.info(id, iTem);
  }
  if (iTem - 1 == id) {
    near = true;
    console.info(id, iTem);
  }
  if (iTem + edge == id) {
    near = true;
    console.info(id, iTem);
  }
  if (iTem - edge == id) {
    near = true;
    console.info(id, iTem);
  }
  if ((iTem + 1) % edge == 0 && id % edge == 0) {
    near = false;
    console.info(id, iTem);
  }
  if (iTem % edge == 0 && (id + 1) % edge == 0) {
    near = false;
    console.info(id, iTem);
  }
  if (ids.length == 2) {
    console.log(2); // TODO: case for 2 to letters words
  }
  return near;
}

var timeout0 = setTimeout(clear, 2500);
async function getTranslate(lang, toLang, word) {
  const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "f4ffc995bbmsh2dcd715d97d7aefp1e0515jsnd23015a25d64",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: new URLSearchParams({
      q: word,
      target: toLang,
      source: lang,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
  }
}

async function collectWord(Id, id, ...args) {
  let translate = "";

  clearTimeout(timeout0);
  ids.push(id);
  word = word + Id;

  document.getElementById("word-input").options[0].text = word;
  document.getElementById("word-input").options[0].selected = true;

  nearCheck(id, ids);

  if (isDict(word) > 0 && word.length >= 3 && nearCheck(id, ids)) {
    //    getTranslate('en','ru',word);
    if (isFinded(word) >= 0 && findwords.indexOf(word)) {
      findwords.splice(findwords.indexOf(word), 1);
      findwords.push(word);
      timeout0 = setTimeout(clear, 2500);
    }
    //stop dubles
    if (isFinded(word) < 0) {
      moreletter();
      if (args.length === 0) {
        findwordids.push(ids);
        createImgDialog(constructorSearchUrl(word));
      }

      var userLang = navigator.language || navigator.userLanguage;

      socket.send(
        JSON.stringify({
          field: letters.join(""),
          findwordids,
        })
      );
      translate = await getTranslate(language, userLang, word);
      translatedwords.push(translate);
      timeout0 = setTimeout(clear, 2500);
      //        s.send(JSON.stringify({"field":letters.join(''), "word": ids,"user": getCookie("username")}));
      ids = [];
    }

    listfindedwords(word, isFinded(word));
  } else if (!nearCheck(id, ids)) {
    timeout0 = setTimeout(clear, 100);
  }
  else timeout0 = setTimeout(clear, 2500);
}

function listfindedwords(word, findindex) {
  var tally = document.getElementById("gametally");

  while (tally.hasChildNodes()) {
    tally.removeChild(tally.lastChild);
  }
  for (var i = 0; i < findwords.length; i++) {
    var newWord = document.createElement("li");
    newWord.innerText = `${findwords[i]} - ${translatedwords[i]}`;
    newWord.className = "pure-menu-iTem";
    //
    tally.insertBefore(
      newWord,
      tally.hasChildNodes() ? tally.childNodes[0] : null
    );
  }

  var WordsSelect = document.getElementById("word");

  while (WordsSelect.hasChildNodes()) {
    WordsSelect.removeChild(WordsSelect.lastChild);
  }

  for (var i = 0; i < findwords.length; i++) {
    var newWord = document.createElement("option");
    newWord.innerText = findwords[i];
    WordsSelect.insertBefore(
      newWord,
      WordsSelect.hasChildNodes() ? WordsSelect.childNodes[0] : null
    );
    WordsSelect.selectedIndex = 0;
  }
}

function clear() {
  var Cells = document.getElementsByClassName("cell");
  for (var i = 0; i < Cells.length; i++) {
    Cells[i].className = "cell";
  }
  word = "";
  ids = [];
  var Select = document.getElementById("word");
  var opt = document.createElement("option");
  opt.value = "";
  opt.innerHTML = "";
  opt.selected = true;
  //Select.appendChild(opt);
  //
}

document.getElementById("clear").onclick = function () {
  clear();
};

function SaveGame_old() {
  var link =
    "/url" +
    "?" +
    "edge=" +
    edge +
    "&letters=" +
    letters.join("") +
    "&userwordsids=" +
    JSON.stringify(findwordids);
  location = link;
}
function SaveGame() {
  localStorage.setItem("edge", edge);
  localStorage.setItem("letters", letters.join(""));
  localStorage.setItem("userwordsids", JSON.stringify(findwordids));
  var link =
    "?" +
    "letters=" +
    encodeURIComponent(letters.join("")) +
    "&userwordsids=" +
    JSON.stringify(findwordids);
  location = link;
}

//вывод слов
function constructorSearchUrl(word) {
  const giphyApiKey = "y3Zyc2M9Wgks54unRGbVJxzWoaIR0Vs8";
  const giphyApiURI = "https://api.giphy.com/v1/gifs/search";
  const giphyApiQuery = {
    api_key: giphyApiKey,
    q: word,
    limit: 1,
    offset: 0,
    rating: "g",
    lang: language,
    bundle: "messaging_non_clips",
  };
  const searchParams = new URLSearchParams(giphyApiQuery);
  return `${giphyApiURI}?${searchParams.toString()}`;
}

function createImgDialog(imgUrl) {
  fetch(imgUrl)
    .then((response) => response.json())
    .then((url) => {
      const dialog = document.createElement("dialog");
      const image = document.createElement("img");
      image.src = url.data[0].images.fixed_height_small.url;
      dialog.appendChild(image)
      document.body.appendChild(dialog)
      dialog.show()
      setTimeout(() => {        
        document.body.removeChild(dialog)
      }, 3000)
 });
}
