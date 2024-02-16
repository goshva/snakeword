
var slideTimeing =[3, 8,13, 17, 19, 33, 38, 40, 58]
var castTimeing = [5,10,15, 19, 22, 35, 40, 42, 60]
var j = 0 
setInterval( function() { 
		slide=slideTimeing.indexOf(j); 
		cast =castTimeing.indexOf(j);
		if (slide > -1) { console.log("show slider #"+(slide+2))}
		if (cast > -1) { console.log("hide slider ")}
		j++ 
} , 1000)

