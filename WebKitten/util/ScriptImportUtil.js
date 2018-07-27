/*
implementation derived from :
http://stackoverflow.com/a/950146
More specifically, "Dynamic Script Loading" , as the whole point is to NOT have JQuery's overhead
*/
var ScriptImportUtil = new function(){}();
ScriptImportUtil.importScript = function(strImport) {
	var temp = strImport.split(".");
	var path = temp.join("/") + ".js";
	var script = document.createElement("script");
	script.src = path;
	document.body.appendChild(script);
}
ScriptImportUtil.importFromList = function(txt) {
	var list = this.splitImportList(txt);
	for (var i=0; i < list.length; i++) {
		this.importScript(list[i]);
	}
}
ScriptImportUtil.splitImportList = function(txt) {
	var out = "";
	for (var i=0; i < txt.length; i++) {
		var curr = txt.charAt(i);
		if (curr != "\r" && curr != " " && curr != "\t") //try to remove SOME offending characters
			out += curr;
	}
	return out.split("\n");
}