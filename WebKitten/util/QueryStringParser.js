var QueryStringParser = new function() {}();
QueryStringParser.parse = function() {
	var parStr = window.location.search;
	var out = {};
	//lazy method for now
	parStr = parStr.slice(1); //trim "?"
	var temp = parStr.split("&");
	for (var i=0; i < temp.length; i++) {
		var curr = temp[i];
		var temp2 = curr.split("=");
		if (temp2.length == 1) {
			out[temp2[0]] = true;
		}
		else if (temp2.length == 2) {
			out[temp2[0]] = temp2[1];
		}
	}
	return out;
}