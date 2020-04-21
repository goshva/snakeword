var edge = 9;
var letters = [];

/////try syllable ///not wrking TODO!
//var syllable = {'б':3585,'в':9080,'г':3225,'д':5685,'ж':2955,'з':2285,'к':5178,'л':9382,'м':4376,'н':7368,'п':4628,'р':11096,'с':7736,'т':12769,'ф':168,'х':1387,'ц':360,'ч':3378,'ш':1423,'щ':1083}
//var Allsyable = 97147;
function isSyllableRoot(char){
	if (char in syllable){
		return true}
	else return false;
}
/////end syllable


function ifexits(variable){
	if (typeof variable == 'undefined') { return null}
	else return variable
}
function getNear(i){
	var neaArr = [];
	neaArr[0] = ifexits(letters[i-edge]);
	neaArr[1] = ifexits(letters[i+1]);
	neaArr[2] = ifexits(letters[i+edge]);
	neaArr[3] = ifexits(letters[i-1]);
	if((i+1)%edge==0){ neaArr[1] = null}
	if (i%edge==0)   { neaArr[3] = null}
	return(neaArr);
}
//

function getRandomInt(min, max)
	{
	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

function generator(){
  for (var i= 0; i< (edge*edge); i++){
	var letter = getRandomInt(0,Allletters);
	var Alphabetcount = 0
	for (var j =0; j<Rangs.length;j++){
		if (letter-Rangs[j]>=0){  letter = letter-Rangs[j]; Alphabetcount++;}
		else  {	letters.push(Alphabet[Alphabetcount]); break; }
	}
  }
genArea();
}

var gameplace = document.getElementById('gameplace');

function genArea(){
      for (var L= 0; L< letters.length; L++){
	var divbtn = document.createElement("DIV");        
        divbtn.className= "cell";
        divbtn.id= "C"+L;
        divbtn.style.zIndex = '10';
        divbtn.Letter = letters[L]
        divbtn.LetterCount=L;
        divbtn.onclick= function (){  collectWord(this.Letter,this.LetterCount); this.className += " activeCell";}
	var t = document.createTextNode(letters[L]);       
	divbtn.appendChild(t);                       
	gameplace.appendChild(divbtn);               
     }
}

//generator();