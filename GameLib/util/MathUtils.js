//not by me... and really just common gamedev knowledge, anyways
//thx to my friend Josh for 'static class' implementation!
//see Debugger for link
var MathUtils = new function(){

}();
MathUtils.radians = function(degrees) {
	return degrees * Math.PI / 180;
}
MathUtils.degrees = function(radians) {
	return radians * 180 / Math.PI;
}
MathUtils.cartFromPolar = function(r,a) {
	var x = r * Math.cos(a);
	var y = r * Math.sin(a);
	return {x:x,y:y};
}
//imported & modified from source code of Crystalien Conflict, used with permission
MathUtils.decToBaseX = function(dec,base)
{
    var s = "";
    var n = dec;
	var b = base || 2;
	if (b > 10) b = 10; //temp limitation
    while (n > 0)
	    {
        s = String(n % b) + s;
        n = Math.floor(n / b);
	    }
	if (s == "")
		s = 0;
    return s;
}
//imported from source code of Crystalien Conflict, used with permission
MathUtils.distance = function(x1,y1,x2,y2)
{
	var tdx = x1 - x2;
	var tdy = y1 - y2;
	return (Math.sqrt((tdx * tdx) + (tdy * tdy)));
}
//imported from source code of Crystalien Conflict, used with permission
MathUtils.clamp = function(value,minimum,maximum)
{
	if (value > maximum)
		return maximum;
	if (value < minimum)
		return minimum;
	return value;
}
//imported from source code of Crystalien Conflict, used with permission
MathUtils.polarize = function(a)
{

	if (a > 0)
		return 1;
	if (a == 0)
		return 0;
	if (a < 0)
		return -1;
}
MathUtils.cycleValues = function(value,shift,min,max) {
	var out = value;
	var inc = this.polarize(shift);
	if (inc == -1) shift *= -1;
	for (var i=0; i < shift; i++) {
		out += inc;
		if (out > max && inc == 1) {
			out = min;
		} else if (out < min && inc == -1) {
			out = max;
		}
	}
	return out;
}