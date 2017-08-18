(function(){
"use strict";
var Debugger = stampit.staticProperties({
	logs : [["DEBUG_LOG","",false,0,0]]
}).statics({
	/*
		Major update required!
	*/
	log : function(category,orig,type,dat) {
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
	},
	trace : function(category){
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
	},
	arrayToString : function(arr){
		var out = "Array: [" + arr.join(" , ") + "]";
		return out;
	},
	stringArrayToString : function(arr){
		var arr2 = [];
		for (var i=0; i < arr.length; i++) {
			var curr = arr[i];
			var curr2 = "\"" + curr + "\"";
			arr2.push(curr2);
		}
		var out = "String Array: [" + arr2.join(" , ") + "]";
		return out;
	},
	objArrayToString : function(arr){
		var arr2 = [];
		for (var i=0; i < arr.length; i++) {
			arr2.push(JSON.stringify(arr[i]));
		}
		var out = "Object Array: [" + arr2.join(" , ") + "]";
		return out;
	},
	muteUnMuteLog : function(category){
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
});
QualityCatGameLibrary.attachModule(Debugger,"Debugger");})();