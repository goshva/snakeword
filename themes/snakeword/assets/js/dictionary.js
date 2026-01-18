// Cross-browser polyfills
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}

if (document.getElementsByClassName === undefined) {
    document.getElementsByClassName = function(cl) {
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

// Utility function to get cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

// Load statistics from stat.json
var statsData = null;

function loadStats(callback) {
    var xobj = new XMLHttpRequest();
    xobj.open("GET", "/stat.json", true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            statsData = JSON.parse(xobj.responseText);
            if (callback) callback();
        }
    };
    xobj.send(null);
}

// Language configuration with fallback to stat.json
var langs = {};

// Language detection
function detectLanguage() {
    var language = getCookie("lang") || 
                   document.documentElement.lang || 
                   (navigator.language || navigator.userLanguage).split('-')[0];
    
    var languageMap = {
        'la': { code: 'la', name: 'Latin', hasGif: true },
        'en': { code: 'en', name: 'English', hasGif: true },
        'es': { code: 'es', name: 'Spanish', hasGif: false },
        'ar': { code: 'ar', name: 'Arabic', hasGif: true },
        'hi': { code: 'hi', name: 'Hindi', hasGif: true },
        'ru': { code: 'ru', name: 'Russian', hasGif: true },
        'fr': { code: 'fr', name: 'French', hasGif: true },
        'de': { code: 'de', name: 'German', hasGif: true },
        'hy': { code: 'hy', name: 'Armenian', hasGif: true },
        'zh': { code: 'zh', name: 'Chinese', hasGif: true },
        'ka': { code: 'ka', name: 'Georgian', hasGif: true }
    };
    
    var langCode = language.toLowerCase();
    var langInfo = languageMap[langCode] || { code: 'en', name: 'English', hasGif: true };
    
    return langInfo;
}

// Main initialization
var currentLanguage = null;
var Allletters = 0;
var Alphabet = [];
var Rangs = [];
var Dict = [];
var testwords = [];
var GameDictCount = 333;

function init() {
    // First detect language
    currentLanguage = detectLanguage();
    
    // Load statistics if available, otherwise use hardcoded data
    loadStats(function() {
        if (statsData && statsData[currentLanguage.code]) {
            var langStats = statsData[currentLanguage.code];
            Allletters = langStats.total_letters;
            Alphabet = langStats.alphabet;
            Rangs = langStats.rangs;
        } else {
            // Fallback to hardcoded data
            var langData = langs[currentLanguage.code] || langs.en;
            Allletters = langData.Allletters;
            Alphabet = langData.Alphabet;
            Rangs = langData.Rangs;
        }
        
        // Load dictionary
        loadDictionary(currentLanguage.name);
    });
}

function loadDictionary(langName) {
    var xobj = new XMLHttpRequest();
    xobj.open("GET", "/dicts/" + langName + ".json", true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            try {
                localStorage.setItem('dict', xobj.responseText);
                Dict = JSON.parse(xobj.responseText);
                console.log("Dictionary loaded for", langName);
                
                // Call initialization functions
                if (typeof generator === "function") {
                    generator();
                }
                
                if (typeof parseWordsfromUrl === "function") {
                    parseWordsfromUrl();
                }
                
                if (typeof genArray !== "undefined" && typeof getRandomInt === "function") {
                    testwords = [];
                    for (var i = 0; i < GameDictCount; i++) {
                        testwords.push(Dict[getRandomInt(0, Dict.length)]);
                    }
                    genArray(testwords);
                }
            } catch (e) {
                console.error("Error loading dictionary:", e);
            }
        }
    };
    xobj.send(null);
}

// Utility function
function isDict(p) {
    return Dict.indexOf(p);
}

// Start the application
init();