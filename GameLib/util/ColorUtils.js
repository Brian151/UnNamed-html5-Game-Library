/*
The majority of the color compositing operatings are derived from the formulas show here:
https://docs.gimp.org/en/gimp-concepts-layer-modes.html

transform() is based off Adobe's Flash.geom.ColorTransform object/API
http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/ColorTransform.html
However, my implementation does not limit the multipliers to the range 0.0 - 1.0 ,
which I feel allows a fair bit more flexibility.

The brightness() method is derived from this tutorial:
http://www.html5canvastutorials.com/advanced/html5-canvas-grayscale-image-colors-tutorial/
(WARNING! annoying automatic re-loads)
*/
var ColorUtils = new function() {}();
ColorUtils.rgba = function(rgbaArray) {
	var temp = rgbaArray;
	temp[3] /= 255;
	return "rgba(" + temp.join(",")  + ")";
}
ColorUtils.transform(color,transform) {
	var r = (color[0] * transform[0]) + transform[4];
	var g = (color[1] * transform[1]) + transform[5];
	var b = (color[2] * transform[2]) + transform[6];
	var a = (color[3] * transform[3]) + transform[7];
	return [r,g,b,a];
}
ColorUtils.preMultiplyAlpha = function(color) {
	var aM = (color[3] / 255);
	var r = Math.round(color[0] * aM);
	var g = Math.round(color[1] * aM);
	var b = Math.round(color[2] * aM);
	/*
	setting alpha to fully opaque. 
	shouldn't matter, regardless. 
	The whole color is something new, now.
	*/
	return [r,g,b,255];
}
ColorUtils.multiply = function(color1,color2) {
	var colorM = this.preMultiplyAlpha(color2);
	var r = (color1[0] * colorM[0]) / 255;
	var g = (color1[1] * colorM[1]) / 255;
	var b = (color1[2] * colorM[2]) / 255;
	var a = color1[3];
	return [r,g,b,a];
}
ColorUtils.brightness = function(color,bright,asGrey) {
	var postBright = bright || 0;
	var exportGrey = asGrey || false;
	var brightness = Math.round((0.34 * color[0]) + (0.5 * color[1]) + (0.16 * color[2]));
	var r = color[0] + postBright;
	var g = color[1] + postBright;
	var b = color[2] + postBright;
	var a = color[3];
	if (exportGrey)
		return [brightness,brightness,brightness,a];
	else
		return [r,g,b,a];
}
ColorUtils.componentHex = function(c) {
	var out = c.toString(16);
	if (c < 16)
		out = "0" + out;
	return out;
}
ColorUtils.toHex = function(color) {
	return "#" + this.componentHex(color[0]) + this.componentHex(color[1]) + this.componentHex(color[2]) + this.componentHex(color[3])
}
ColorUtils.invert = function(color) {
	var r = 255 - color[0];
	var g = 255 - color[1];
	var b = 255 - color[2];
	var a = color[3]
	return [r,g,b,a];
}