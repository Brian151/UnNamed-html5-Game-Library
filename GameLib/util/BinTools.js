/*
//Imported from code I (Brian151) wrote here : https://jsfiddle.net/721c2py0/2/
var cons = document.getElementById("out");
cons.innerHTML = "STUFF: ";


function disp(par){
cons.innerHTML += "<br/>" + par;
}

function dispBin(num){
disp(num.toString(2));
}

function dispHex(num){
disp(num.toString(16));
}

var t1 = 0xff;
var t2 = t1 << 8;
var t3 = (t1 & 0b11000000) >> 6;
var b1 = 0b0000000000001111;
var t4 = (t2 & 0b1010101000000000) | b1;

disp("ORIG:");
dispHex(t1);
dispBin(t1);
disp("MOD:");
dispHex(t2);
dispBin(t2);
disp("FIRST TWO BITS:");
dispHex(t3);
dispBin(t3);
disp("SOME OTHER TWEAKS:");
dispHex(t4);
dispBin(t4);
*/
var BinTools = new function(){}();
//imported from code I (Brian151) wrote here: https://jsfiddle.net/158vahfc/1/
BinTools.bitfieldUtil = new function(){
	this.masks = [
		0b10000000,
		0b01000000,
		0b00100000,
		0b00010000,
		0b00001000,
		0b00000100,
		0b00000010,
		0b00000001
		];
	this.shifts = [7,6,5,4,3,2,1,0];
}();
BinTools.bitfieldUtil.readFlag = function(field,flag){
	var out = (field & this.masks[flag - 1]) >> this.shifts[flag - 1];
	return out;
}
BinTools.bitfieldUtil.setFlag = function(field,flag) {
	var test = (field & this.masks[flag - 1]) >> this.shifts[flag - 1];
	if (!test) {field += this.masks[flag - 1]} else {}
	return field;
}
BinTools.bitfieldUtil.clearFlag = function(field,flag) {
	var test = (field & this.masks[flag - 1]) >> this.shifts[flag - 1];
	if (test) {field -= this.masks[flag - 1]} else {}
	return field;
}
BinTools.bitfieldUtil.dumpField = function(field){
	return field.toString(2);
}
BinTools.bitfieldUtil.bitToBool = function(bit) {
	var out = false;
	if (bit > 0) out = true;
	return out;
}
BinTools.bitfieldUtil.boolToBit = function(bool) {
	var out = 0b00000000;
	if (bool > 0) out = 0b00000001;
	return out;
}
BinTools.bitfieldUtil.fieldToBooleanArray = function(field) {
	var out = [];
	out[0] = this.bitToBool((field & this.masks[1 - 1]) >> this.shifts[1 - 1]);
	out[1] = this.bitToBool((field & this.masks[2 - 1]) >> this.shifts[2 - 1]);
	out[2] = this.bitToBool((field & this.masks[3 - 1]) >> this.shifts[3 - 1]);
	out[3] = this.bitToBool((field & this.masks[4 - 1]) >> this.shifts[4 - 1]);
	out[4] = this.bitToBool((field & this.masks[5 - 1]) >> this.shifts[5 - 1]);
	out[5] = this.bitToBool((field & this.masks[6 - 1]) >> this.shifts[6 - 1]);
	out[6] = this.bitToBool((field & this.masks[7 - 1]) >> this.shifts[7 - 1]);
	out[7] = this.bitToBool((field & this.masks[8 - 1]) >> this.shifts[8 - 1]);
	return out;
}
BinTools.bitfieldUtil.booleanArrayToField = function(boolArray) {
	out = 0b00000000;
	out += this.boolToBit(boolArray[0]) << this.shifts[0];
	out += this.boolToBit(boolArray[1]) << this.shifts[1];
	out += this.boolToBit(boolArray[2]) << this.shifts[2];
	out += this.boolToBit(boolArray[3]) << this.shifts[3];
	out += this.boolToBit(boolArray[4]) << this.shifts[4];
	out += this.boolToBit(boolArray[5]) << this.shifts[5];
	out += this.boolToBit(boolArray[6]) << this.shifts[6];
	out += this.boolToBit(boolArray[7]) << this.shifts[7];
	return out;
}