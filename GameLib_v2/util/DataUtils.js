var DataUtils = new function(){
	this.asciiChars = [" ","!","#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","€","ƒ","„","…","†","‡","ˆ","‰","Š","‹","Œ","Ž","‘","’","“","”","•","–","—","˜","™","š","›","œ","","ž","Ÿ","¡","¢","£","¤","¥","¦","§","¨","©","ª","«","¬","­","®","¯","°","±","²","³","´","µ","¶","·","¸","¹","º","»","¼","½","¾","¿","À","Á","Â","Ã","Ä","Å","Æ","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï","Ð","Ñ","Ò","Ó","Ô","Õ","Ö","×","Ø","Ù","Ú","Û","Ü","Ý","Þ","ß","à","á","â","ã","ä","å","æ","ç","è","é","ê","ë","ì","í","î","ï","ð","ñ","ò","ó","ô","õ","ö","÷","ø","ù","ú","û","ü","ý","þ","ÿ"];
}();
//imported from source code of Crystalien Conflict, used with permission
DataUtils.asciiToNum = function(char) {
	var out = 0;
	for (var i=0; i< this.asciiChars.length; i++)
		{
		if (char == this.asciiChars[i])
			{
			out = i;
			return out;
			break;
			}
		}
}
DataUtils.numToAscii = function(num) {
	var out = " ";
	if (num < this.asciiChars.length) {
		out = this.asciiChars[num];
	} else if(num < 0 || num >= this.asciiChars.length){
		console.log("WARNING! INPUT VALUE OUSIDE OF ACCEPTABLE RANGE, DEFAULTED TO 0!");
		console.log("NUMBER : " + num + "WAS PROVIDED");
		console.log("MIN POSSIBLE : " + 0 + " ,MAX POSSIBLE : " + this.asciiChars.length - 1);
	}
	return out;
}