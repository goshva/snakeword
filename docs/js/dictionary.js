//ie stuff
if (document.getElementsByClassName == undefined) {
  document.getElementsByClassName = function (cl) {
    var retnode = [];
    var myclass = new RegExp("\\b" + cl + "\\b");
    var elem = this.getElementsByTagName("*");
    for (var i = 0; i < elem.length; i++) {
      var classes = elem[i].className;
      if (myclass.test(classes)) {
        retnode.push(elem[i]);
      }
    }
    return retnode;
  };
}

//ie stuff end
//

var langs = {
  de: {
    Allletters: 147148193692,
    Alphabet: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "ß",
      "ä",
      "ö",
      "ü",
    ],
    Rangs: [
      8838820844, 3160853720, 3958430692, 6942766241, 23552726179, 2696300813,
      4508999495, 6253483261, 11407811479, 438225141, 2261416100, 5572784575,
      4117658463, 14215704079, 3949634440, 1544621099, 41628685, 11385975684,
      9335023050, 9372320424, 5622524321, 1351999644, 2100602075, 76089052,
      158901451, 1821129027, 251062177, 807767942, 397035050, 1005898489,
    ],
  },
  fr: {
    Allletters: 546554649,
    Alphabet: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "à",
      "á",
      "â",
      "ç",
      "è",
      "é",
      "ê",
      "ë",
      "í",
      "î",
      "ï",
      "ô",
      "ö",
      "ù",
      "û",
      "ü",
    ],
    Rangs: [
      67563628, 10817171, 30219574, 34914685, 115024205, 10579192, 11684140,
      10583562, 62672992, 3276064, 2747547, 47171247, 24894034, 60728196,
      47724400, 23647179, 6140307, 57656209, 61882785, 56267109, 42698875,
      10590858, 1653435, 3588990, 4351953, 1433913, 2966029, 73751, 320837,
      544509, 2969466, 18451937, 802211, 53862, 48391, 280201, 138221, 357197,
      51020, 151236, 164516, 55172,
    ],
  },
  ru: {
    Allletters: 476138573,
    Alphabet: [
      "а",
      "б",
      "в",
      "г",
      "д",
      "е",
      "ё",
      "ж",
      "з",
      "и",
      "й",
      "к",
      "л",
      "м",
      "н",
      "о",
      "п",
      "р",
      "с",
      "т",
      "у",
      "ф",
      "х",
      "ц",
      "ч",
      "ш",
      "щ",
      "ъ",
      "ы",
      "ь",
      "э",
      "ю",
      "я",
    ],
    Rangs: [
      38081816, 7579289, 21582499, 8031521, 14173134, 40392978, 63623, 4476464,
      7811723, 35075552, 5753983, 16599539, 20678280, 15252377, 31900994,
      52295949, 13349597, 22595850, 26058590, 30084462, 12452612, 1268926,
      4597146, 2314208, 6904749, 3420179, 1719607, 175908, 9036813, 8263123,
      1573696, 3044673, 9528713,
    ],
  },
  hy: {
    Allletters: 120000,
    Alphabet: [
      "ա",
      "բ",
      "գ",
      "դ",
      "ե",
      "զ",
      "է",
      "ը",
      "թ",
      "ժ",
      "ի",
      "լ",
      "խ",
      "ծ",
      "կ",
      "հ",
      "ձ",
      "ղ",
      "ճ",
      "մ",
      "յ",
      "ն",
      "շ",
      "ո",
      "չ",
      "պ",
      "ջ",
      "ռ",
      "ս",
      "վ",
      "տ",
      "ր",
      "ց",
      "ու",
      "փ",
      "ք",
      "և",
      "օ",
      "ֆ",
    ],
    Rangs: [
      98512, 74154, 89452, 42754, 12147, 24546, 152134, 60977, 69478, 15317, 77564, 40132,
      232, 67147, 75695, 19447, 95676, 59732, 64663, 90897, 27789, 98123, 26047, 15001, 19785,
      7974
    ],
  },
  la: {
    Allletters: 8525945,
    Alphabet: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "v",
      "x",
      "y",
      "z",
    ],
    Rangs: [
      866192, 129803, 386618, 216233, 885734, 86277, 114190, 94125, 978425,
      3179, 10515, 309673, 425295, 590387, 500492, 232155, 64254, 548327,
      624609, 677502, 605525, 109025, 6430, 34883, 19348, 6749,
    ],
  },
  en: {
    Allletters: 99999,
    Alphabet: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
    Rangs: [
      8167, 1492, 2782, 4254, 12702, 2228, 2015, 6094, 6966, 153, 772, 4025,
      2406, 6749, 7507, 1929, 95, 5987, 6327, 9054, 2758, 978, 2360, 150, 1947,
      74,
    ],
  },
  ar: {
    Allletters: 9133,
    Alphabet: [
      "ء",
      "ؤ",
      "ئ",
      "ا",
      "آ",
      "أ",
      "إ",
      "ب",
      "ة",
      "ت",
      "ث",
      "ج",
      "ح",
      "خ",
      "د",
      "ذ",
      "ر",
      "ز",
      "س",
      "ش",
      "ص",
      "ض",
      "ط",
      "ظ",
      "ع",
      "غ",
      "ف",
      "ق",
      "ك",
      "ل",
      "م",
      "ن",
      "ه",
      "و",
      "ى",
      "ي",
    ],
    Rangs: [
      20, 5, 18, 1250, 10, 300, 100, 450, 320, 80, 110, 180, 80, 90, 250, 80,
      410, 40, 230, 70, 90, 40, 50, 10, 390, 30, 270, 260, 190, 1200, 630, 640,
      500, 580, 100, 60,
    ],
  }

};
//var language = window.navigator.userLanguage || window.navigator.language || document.documentElement.lang // || getCookie('lang')
var language = getCookie("lang") || document.documentElement.lang;

var namedict;

if (language == "la" || language == "la-LA" || language == "la-la") {
  language = "la";
  namedict = "Latin";
}

if (language == "en" || language == "en-US" || language == "en-us") {
  language = "en";
  namedict = "English";
}

if (language == "es" || language == "es-ES" || language == "es-es") {
  language = "es";
  namedict = "Spanish";
}
if (language == "ar" || language == "ar-AR" || language == "ar-ar") {
  language = "ar";
  namedict = "Arabic";
}
if (language == "hi" || language == "hi-HI" || language == "hi-hi") {
  language = "hi";
  namedict = "Hindi";
}
if (language == "ru" || language == "ru-RU" || language == "ru-ru") {
  language = "ru";
  namedict = "Russian";
}
if (language == "bn" || language == "bn-BN" || language == "bn-bn") {
  language = "bn";
  namedict = "Bengali";
}
if (language == "pt" || language == "pt-PT" || language == "pt-pt") {
  language = "pt";
  namedict = "Portuguese";
}
if (language == "ms" || language == "ms-MS" || language == "ms-ms") {
  language = "ms";
  namedict = "Malay";
}
if (language == "fr" || language == "fr-FR" || language == "fr-fr") {
  language = "fr";
  namedict = "French";
}
if (language == "de" || language == "de-DE" || language == "de-de") {
  language = "de";
  namedict = "German";
}
if (language == "ur" || language == "ur-UR" || language == "ur-ur") {
  language = "ur";
  namedict = "Urdu";
}
if (language == "pa" || language == "pa-PA" || language == "pa-pa") {
  language = "pa";
  namedict = "Punjabi";
}
if (language == "fa" || language == "fa-FA" || language == "fa-fa") {
  language = "fa";
  namedict = "Farsi";
}
if (language == "sw" || language == "sw-SW" || language == "sw-sw") {
  language = "sw";
  namedict = "Swahili";
}
if (language == "ta" || language == "ta-TA" || language == "ta-ta") {
  language = "ta";
  namedict = "Tamil";
}
if (language == "it" || language == "it-IT" || language == "it-it") {
  language = "it";
  namedict = "Italian";
}
if (language == "hy" || language == "hy-HY" || language == "hy-hy") {
  language = "hy";
  namedict = "Armenian";
}

//else { language ="en"; namedict = "English"}
var Allletters = langs[language]["Allletters"];
var Alphabet = langs[language]["Alphabet"];
var Rangs = langs[language]["Rangs"];

var namedict;

var Dict = [];
var testwords = [];
var GameDictCount = 333; //wtf?

function loadJSON(callback, namedict) {
  var xobj = new XMLHttpRequest();
  xobj.open("GET", "/js/dicts/" + namedict + ".json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  loadJSON(function (response) {
    localStorage.setItem('dict', response); 
    Dict = JSON.parse(response);

    document.getElementById("points").innerText = 0;

    if (typeof generator == "function") {
      generator();
    } // random generate area

    if (typeof parseWordsfromUrl == "function") {
      parseWordsfromUrl();
    } //load save game words

    if (typeof genArray != "undefined" && typeof getRandomInt == "function") {
      for (var i = 0; i < GameDictCount; i++) {
        testwords.push(Dict[getRandomInt(0, Dict.length)]);
      }
      genArray(testwords);
    }
  }, namedict);
}
//
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, start) {
    for (var i = start || 0, j = this.length; i < j; i++) {
      if (this[i] === obj) {
        return i;
      }
    }
    return -1;
  };
}
//
function isDict(p) {
  return Dict.indexOf(p);
}
//
init();
