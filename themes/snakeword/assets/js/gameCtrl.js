/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */



const cutButton = document.querySelector('.deleteBtn');
let word = '';
let ids = [];
const findwords = [];
const translatedwords = [];
let findwordids = [];
let socket = null;
//
cutButton.style.opacity = "0.5"
cutButton.style.pointerEvents = "none"


function hidenotify() {
  const notifies = document.getElementsByClassName('notify');
  for (let i = 0; i < notifies.length; i += 1) {
    notifies[i].style.display = 'none';
    
  }
}

function shownotify(text, Noteclass) {
  const notify = document.getElementById(Noteclass);
  notify.style.display = 'block';
  // notify.innerText = text;
  setTimeout(hidenotify, 1900);
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toGMTString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function checkCookie(key) {
  let user = getCookie(key);
  if (user !== '') {
    // alert("Welcome again " + user);
    setCookie(user, 0, 30);
  } else {
    user = prompt('Please enter your name:', '');
    if (user !== '' && user !== null) {
      setCookie('username', user, 30);
    }
  }
}

function BorderfromFindWord(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    document.getElementById(`C${arr[i]}`).style.border = 'thin solid #1f8dd6';
  }
}

function isFinded(findedWord) {
  return findwords.indexOf(findedWord);
}

function moreletter() {
  findwords.push(word);
  // show modal if we get all the words on playfield
  const set = new Set(wordsInGame);
  const uniqueWords = Array.from(set);
  if (findwords.length === uniqueWords) {
    const popup = document.querySelector('.b-popup');
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
  }
  // findwordids.push(ids);//////////////////////////////////
  document.getElementById('points').innerText = findwordids.length + 1;
}

function nearCheck(id, findIds) {
  let near = false;
  edge = parseInt(edge, 10);

  id = parseInt(id, 10);
  iTem = findIds[findIds.length - 2];
  if (iTem === id) {

    near = false;
    console.info(id, iTem);
  }
  if (iTem + 1 === id) {
    near = true;
    console.info(id, iTem);
  }
  if (iTem - 1 === id) {
    near = true;
    console.info(id, iTem);
  }
  if (iTem + edge === id) {
    near = true;
    console.info(id, iTem);
  }
  if (iTem - edge === id) {
    near = true;
    console.info(id, iTem);
  }
  if ((iTem + 1) % edge === 0 && id % edge === 0) {
    near = false;
    console.info(id, iTem);
  }
  if (iTem % edge === 0 && (id + 1) % edge === 0) {
    let cell =  document.querySelectorAll(".cell")
    cell[id].classList.add("gold")
    near = false;
    console.info(id, iTem);
  }
  if (ids.length === 2) {
    console.log(2); // TODO: case for 2 to letters words
  }
  return near;
}

function clear() {
  Array.from(document.getElementsByClassName('cell'))
  .map((cell) => {
    findwordids.flat()
    .map((id) => `C${id}`)
    .includes(cell.id) ? cell.className = 'cell DoneCell' : cell.className = 'cell';
  });
  
  word = '';
  ids = [];
  const opt = document.createElement('option');
  opt.value = '';
  opt.innerHTML = '';
  opt.selected = true;
  cutButton.style.opacity = "0.5"
cutButton.style.pointerEvents = "none"
  // Selectq.appendChild(opt);
  //
}

const timeout0 = setTimeout(clear, 2500);
async function getTranslate(lang, toLang, newWord) {
  const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': 'f4ffc995bbmsh2dcd715d97d7aefp1e0515jsnd23015a25d64',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
    body: new URLSearchParams({
      q: newWord,
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

function listfindedwords() {
  const tally = document.getElementById('gametally');
  while (tally.hasChildNodes()) {
    tally.removeChild(tally.lastChild);
  }
  for (let i = 0; i < findwords.length; i += 1) {
    const newWord = document.createElement('li');
    newWord.innerText = `${findwords[i]} - ${translatedwords[i]}`;
    newWord.className = 'pure-menu-iTem';
    //
    tally.insertBefore(
      newWord,
      tally.hasChildNodes() ? tally.childNodes[0] : null,
    );
  }

  const WordsSelect = document.getElementById('word');

  while (WordsSelect.hasChildNodes()) {
    WordsSelect.removeChild(WordsSelect.lastChild);
  }

  for (let i = 0; i < findwords.length; i += 1) {
    const newWord = document.createElement('option');
    newWord.innerText = findwords[i];
    WordsSelect.insertBefore(
      newWord,
      WordsSelect.hasChildNodes() ? WordsSelect.childNodes[0] : null
    );
    WordsSelect.selectedIndex = 0;
   
  }
}

function cutWord() {
  word = '';
  const deleteAudio = new Audio("../sounds/spacebar-click-keyboard-199448.mp3")
  document.getElementById('word-input').options[0].text = word;
  deleteAudio.play()
  clear();
}


cutButton.addEventListener('click', cutWord);

function SaveGame_old() {
  const link = '/url'
    + '?'
    + `edge=${
      edge
    }&letters=${
      letters.join('')
    }&userwordsids=${
      JSON.stringify(findwordids)}`;
  location = link;
}
function SaveGame() {
  localStorage.setItem('edge', edge);
  localStorage.setItem('letters', letters.join(''));
  localStorage.setItem('userwordsids', JSON.stringify(findwordids));
  const link = '?'
    + `letters=${
      encodeURIComponent(letters.join(''))
    }&userwordsids=${
      JSON.stringify(findwordids)}`;
  location = link;
}

// вывод слов
function constructorSearchUrl(newWord) {
  const giphyApiKey = 'y3Zyc2M9Wgks54unRGbVJxzWoaIR0Vs8';
  const giphyApiURI = 'https://api.giphy.com/v1/gifs/search';
  const giphyApiQuery = {
    api_key: giphyApiKey,
    q: newWord,
    limit: 1,
    offset: 0,
    rating: 'g',
    lang: language,
    bundle: 'messaging_non_clips',
  };
  const searchParams = new URLSearchParams(giphyApiQuery);
  return `${giphyApiURI}?${searchParams.toString()}`;
}

function createImgDialog(imgUrl) {
  fetch(imgUrl)
    .then((response) => response.json())
    .then((url) => {
      const dialog = document.querySelector(".dialog");
      const dialog_for_mobile = document.querySelector(".dialog_for_mobile")
      const image = document.querySelector('.imageGifs');
      const image_for_mobile = document.querySelector('.imageGifForPhone');
      image_for_mobile.src = "../img/backgroundImage.png"
      image.src = url.data[0].images.fixed_height_small.url;
      image_for_mobile.src  = url.data[0].images.fixed_height_small.url;
      dialog.classList.add("active");
      dialog_for_mobile.classList.add("active");
    
      setTimeout(() => {
        dialog.classList.remove("active");
        dialog_for_mobile.classList.remove("active");
      }, 3000);
    });
}






function sound() {
    var snd = new Audio("../sounds/click.mp3")
snd.play()

}

async function collectWord(Id, id, ...args) {
  let translate = '';
  const errorText = document.querySelector(".error")
  clearTimeout(timeout0);
  ids.push(id);
  word += Id;

  document.getElementById('word-input').options[0].text = word;
  const findWord = document.querySelector(".findWord")
  document.getElementById('word-input').options[0].selected = true;

  nearCheck(id, ids);

  if (isDict(word) > 0 && word.length >= 3 && nearCheck(id, ids)) {
    //    getTranslate('en','ru',word);
    if (isFinded(word) >= 0 && findwords.indexOf(word)) {
      findwords.splice(findwords.indexOf(word), 1);
      findwords.push(word);
    }
    // stop dubles
    if (isFinded(word) < 0) {
      moreletter();
      if (args.length === 0) {
        findwordids.push(ids);
        createImgDialog(constructorSearchUrl(word));
        document.getElementById('word-input').options[0].text = '';
        const optionEl = document.createElement('option');
        const wordSPan = document.createElement("span")
        wordSPan.classList.add("wordSpan")
        wordSPan.innerHTML += word
        optionEl.text = word;
        errorText.classList.add("active")
        errorText.innerHTML = ""
         findWord.append(wordSPan)

        document.getElementById('word-input').append(optionEl);
        new Audio("../sounds/correct-choice-43861.mp3").play()
        cutButton.style.opacity = "0.5"
cutButton.style.pointerEvents = "none"
      }
      else{
        errorText.classList.remove("active")
      }

      const userLang = navigator.language || navigator.userLanguage;

      socket.send(
        JSON.stringify({
          field: letters.join(''),
          findwordids,
        }),
      );
      translate = await getTranslate(language, userLang, word);
      translatedwords.push(translate);
      // eslint-disable-next-line max-len
      //        s.send(JSON.stringify({"field":letters.join(''), "word": ids,"user": getCookie("username")}));
      ids = [];
    }

    listfindedwords(word, isFinded(word));
  } else setTimeout(clear, 2500);
}
