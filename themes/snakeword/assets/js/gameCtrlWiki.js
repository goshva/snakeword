var points = 0;
var word = "";
var ids = [];
var findwords = [];
var findwordids = [];
var opponentfindwords = [];
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
checkCookie("username");
///

var s = new WebSocket("wss://boggle.space:8080");
s.onopen = function (e) {
  console.info("ws opened");
  s.send(
    JSON.stringify({
      field: letters.join(""),
      word: [0],
      user: getCookie("username"),
    })
  );
};
s.onclose = function (e) {
  console.info("ws closed");
};
s.onmessage = function (e) {
  var message = JSON.parse(e.data);
  if (
    message.field == letters.join("") &&
    message.user != getCookie("username")
  ) {
    BorderfromFindWord(message.word);
    shownotify(message.user + " +" + message.word.length);
  }
};
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

  id = parseInt(id);
  iTem = ids[ids.length - 2];
  if (iTem + 1 == id) {
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
    console.log(2);
  }
  return near;
}

var timeout0 = setTimeout(clear, 2500);

function collectWord(Id, id) {
  clearTimeout(timeout0);
  ids.push(id);
  word = word + Id;

  document.getElementById("word").options[0].text = word;
  document.getElementById("word").options[0].selected = true;

  nearCheck(id, ids);

  if (isDict(word) > 0 && word.length >= 3 && nearCheck(id, ids)) {
    if (isFinded(word) >= 0 && findwords.indexOf(word)) {
      findwords.splice(findwords.indexOf(word), 1);
      findwords.push(word);
      timeout0 = setTimeout(clear, 2500);
    }
    //stop dubles
    if (isFinded(word) < 0) {
      moreletter();
      findwordids.push(ids);
      timeout0 = setTimeout(clear, 2500);
      scriptRequest(wikiurl(word), ok, fail);
      s.send(
        JSON.stringify({
          field: letters.join(""),
          word: ids,
          user: getCookie("username"),
        })
      );
      ids = [];
    }
    listfindedwords(word, isFinded(word));
  } else timeout0 = setTimeout(clear, 2500);
}
function listfindedwords(word, findindex) {
  var tally = document.getElementById("gametally");

  while (tally.hasChildNodes()) {
    tally.removeChild(tally.lastChild);
  }
  for (var i = 0; i < findwords.length; i++) {
    var newWord = document.createElement("li");
    newWord.innerText = findwords[i];
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
  Select.appendChild(opt);
  //
}

document.getElementById("clear").onclick = function () {
  clear();
};

function SaveGame() {
  var link =
    "https://boggle.space/url" +
    "?" +
    "edge=" +
    edge +
    "&letters=" +
    letters.join("") +
    "&userwordsids=" +
    JSON.stringify(findwordids);
  location = link;
}

//wiki CAllback stuff
var CallbackRegistry = {}; // реестр

// при успехе вызовет onSuccess, при ошибке onError
function scriptRequest(url, onSuccess, onError) {
  var scriptOk = false; // флаг, что вызов прошел успешно

  // сгенерировать имя JSONP-функции для запроса
  var callbackName = "cb" + String(Math.random()).slice(-6);

  // укажем это имя в URL запроса
  url += ~url.indexOf("?") ? "&" : "?";
  url += "callback=CallbackRegistry." + callbackName;

  // ..и создадим саму функцию в реестре
  CallbackRegistry[callbackName] = function (data) {
    scriptOk = true; // обработчик вызвался, указать что всё ок
    delete CallbackRegistry[callbackName]; // можно очистить реестр
    onSuccess(data); // и вызвать onSuccess
  };

  // эта функция сработает при любом результате запроса
  // важно: при успешном результате - всегда после JSONP-обработчика
  function checkCallback() {
    if (scriptOk) return; // сработал обработчик?
    delete CallbackRegistry[callbackName];
    onError(url); // нет - вызвать onError
  }

  var script = document.createElement("script");

  // в старых IE поддерживается только событие, а не onload/onerror
  // в теории 'readyState=loaded' означает "скрипт загрузился",
  // а 'readyState=complete' -- "скрипт выполнился", но иногда
  // почему-то случается только одно из них, поэтому проверяем оба
  script.onreadystatechange = function () {
    if (this.readyState == "complete" || this.readyState == "loaded") {
      this.onreadystatechange = null;
      setTimeout(checkCallback, 0); // Вызвать checkCallback - после скрипта
    }
  };

  // события script.onload/onerror срабатывают всегда после выполнения скрипта
  script.onload = script.onerror = checkCallback;
  script.src = url;

  document.body.appendChild(script);
}
function ok(data) {
  var pageId = Object.keys(data["query"]["pages"]);
  if (data["query"]["pages"][pageId[0]]["images"]) {
    var picName =
      data["query"]["pages"][pageId[0]]["images"][0]["title"].substring(5);
    if (picName == "Commons-logo.svg" || picName == "Disambig.svg") {
      console.log("default");
      data["query"]["pages"][pageId[0]]["images"].splice(0, 1);
      var picName =
        data["query"]["pages"][pageId[0]]["images"][0]["title"].substring(5);
    }
    console.info(data["query"]["pages"]);
    scriptRequest(wikiPicurl(picName), Picok, fail);
  }
}
function Picok(data) {
  var pageId = Object.keys(data["query"]["pages"]);
  //   console.info(data["query"]["pages"][pageId[0]]['imageinfo'][0]['thumburl'])
  var block = document.getElementById("game");
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }
  var img = document.createElement("img");
  img.src = data["query"]["pages"][pageId[0]]["imageinfo"][0]["thumburl"];
  block.appendChild(img);
  shownotify("test", "game");
}

function fail(url) {
  alert("Ошибка при запросе " + url);
}

function wikiurl(word) {
  return (
    "https://ru.wikipedia.org/w/api.php?format=json&prop=images&action=query&titles=" +
    word
  );
}
//function wikiPicurl(word){return "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&&iiprop=url&iiurlwidth=110&format=json&ailimit=2&titles=File:"+ encodeURIComponent(word)}
function wikiPicurl(word) {
  return (
    "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&&iiprop=url&iiurlwidth=220&format=json&titles=File:" +
    encodeURIComponent(word)
  );
}

//scriptRequest(wikiurl('насос'),ok,fail);
//scriptRequest("https://en.wikipedia.org/w/api.php?action=query&titles=Albert%20Einstein&prop=images&format=json",ok,fail);

//https://commons.wikimedia.org/w/api.php?action=query&titles=File:Albert%20Einstein%20(Nobel).png&prop=imageinfo&&iiprop=url&iiurlwidth=110&format=json&callback=?
