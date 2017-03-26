//thx to my friend Josh for helping get this working as a 'static class' as intended!
//https://github.com/leveleditor
/*
	Major update in progress!
*/
var Debugger = new function(){
	this.logs = [["DEBUG_LOG","",false,0,0]];
}();
Debugger.log = function(category,orig,type,dat) {
	var i = this.logs.length;
	for (var i0 = 0; i0 < this.logs.length; i0++) {
		var curr = this.logs[i0][0];
		if (curr == category) {
			i = i0;
			break;
		}
	}
	if (i == this.logs.length) {
		this.logs.push([category,"",false,0,0]);
	}
	var oT = "[" + orig + "] - ";
	var tT = type + " : ";
	var dT = dat;
	this.logs[i][1] += "\n" + oT + tT + dT;
}
Debugger.trace = function(category) {
	var i = -1;
	for (var i0 = 0; i0 < this.logs.length; i0++) {
		var curr = this.logs[i0][0];
		if (curr == category) {
			i = i0;
			break;
		}
	}
	if (i >= 0) {
		console.log("{" + this.logs[i][0] + "}" + this.logs[i][1]);
	}
}
Debugger.arrayToString = function(arr) {
	var out = "Array: [" + arr.join(" , ") + "]";
	return out;
}
Debugger.stringArrayToString = function(arr) {
	var arr2 = [];
	for (var i=0; i < arr.length; i++) {
		var curr = arr[i];
		var curr2 = "\"" + curr + "\"";
		arr2.push(curr2);
	}
	var out = "String Array: [" + arr2.join(" , ") + "]";
	return out;
}
Debugger.objArrayToString = function(arr) {
	var arr2 = [];
	for (var i=0; i < arr.length; i++) {
		arr2.push(JSON.stringify(arr[i]));
	}
	var out = "Object Array: [" + arr2.join(" , ") + "]";
	return out;
}
Debugger.muteUnMuteLog = function(category) {
	var i = -1;
	for (var i0 = 0; i0 < this.logs.length; i0++) {
		var curr = this.logs[i0][0];
		if (curr == category) {
			i = i0;
			break;
		}
	}
	if (i >= 0) {
		this.logs[i][2] = !this.logs[i][2];
	}
}