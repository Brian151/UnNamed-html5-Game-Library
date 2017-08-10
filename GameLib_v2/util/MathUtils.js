(function(){
"use strict"
//not all are by me... and they're really just common programming/math knowledge, anyways
var MathUtils = stampit.statics({
	radians : function(degrees) {
		return degrees * Math.PI / 180;
	},
	degrees : function(radians) {
		return radians * 180 / Math.PI;
	},
	cartFromPolar : function(r,a) { // possibly use vector (array) instead!
		var x = r * Math.cos(a);
		var y = r * Math.sin(a);
		return {x:x,y:y};
	},
	decToBaseX : function(dec,base) { // do i even need? native JS!!!
		//imported & modified from source code of Crystalien Conflict, used with permission
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
	},
	distance : function(x1,y1,x2,y2) { //imported from source code of Crystalien Conflict, used with permission
		var tdx = x1 - x2;
		var tdy = y1 - y2;
		return (Math.sqrt((tdx * tdx) + (tdy * tdy)));
	},
	clamp : function(value,minimum,maximum) { //imported from source code of Crystalien Conflict, used with permission
		if (value > maximum)
			return maximum;
		if (value < minimum)
			return minimum;
		return value;
	},
	polarize : function(a) { //imported from source code of Crystalien Conflict, used with permission
		if (a > 0)
			return 1;
		if (a == 0)
			return 0;
		if (a < 0)
			return -1;
	},
	cycleValues : function(value,shift,min,max) { // re-do or scrap?
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
	},
	clampAngle : function(a,include360) { // still not happy with results...
		var out = a;
		if (a >= 360) {
			out = a - (Math.floor(a/360) * 360);
		} else if (a < 0) {
			if (a <= -360) {
				out = a - (Math.floor(a/360) * 360);
			} else {
				out += 360;
			}
		}
		if (include360) {
			if (a == 360 || a == -360) return a;
		}
		return out;
	},
	getDelta : function(a,b) { // should re-name???
		var n = (a > b)
		if (n) {
			return (a - b) * -1
		} else {
			return (b - a);
		}
	}
});
QualityCatGameLibrary.attachModule(MathUtils,"Math");})();