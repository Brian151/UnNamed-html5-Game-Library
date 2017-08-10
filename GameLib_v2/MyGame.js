(function(){
"use strict";
var tries = 0;
var triesMax = 100000;
var preloadLoop = setInterval(function(){
	if (tries >= triesMax) {
		clearInterval(preloadLoop);
		console.error("Failed to load!");
	}
	if (typeof QualityCatGameLibrary == "object") {
		if (typeof QualityCatGameLibrary.Game == "function") {
			clearInterval(preloadLoop);
			var theGame = QualityCatGameLibrary.Game();
			theGame.start(600,400);
			console.log(tries);
		}
	}
	tries++;
},100);})();