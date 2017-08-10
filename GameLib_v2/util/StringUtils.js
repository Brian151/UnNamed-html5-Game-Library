(function(){
"use strict";
var StringUtils = stampit.statics({
	subDivide : function(string,segmentLength) {
		var out = []; //an array of smaller strings
		var pending = ""; //buffer
		var l = segmentLength; //length of segments to divide source string into
		for (var i=0; i< string.length; i++){
			//check timer and that the incrementer is greater than 0, OR if we're on the last character of the string
			if ((i % l == 0 && i > 0) || i == (string.length - 1)) {
				//catch end of string
				//if buffer is full, push to output array and set to current character
				//else add the current character to the buffer
				if (i == (string.length - 1)) {
					if (pending.length == l) {
						out.push(pending);
						pending = string.charAt(i);
					} else {
						pending += string.charAt(i);
					}
				}
				out.push(pending); //push buffer to output array
				pending=""; //reset buffer to empty string
			}
		pending += string.charAt(i);//add the current character to the buffer
		}
		return out;
	}
});
QualityCatGameLibrary.attachModule(StringUtils,"Str");})();