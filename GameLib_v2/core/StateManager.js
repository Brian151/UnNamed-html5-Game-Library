(function(){
"use strict";
var StateManager = stampit.deepProps({
	parent : {}
}).methods({
	tick : function(){}, // stub methods, as it's up to the programmer to customize these!
	draw : function(){},
	attach : function(obj) {
		this.parent = obj;
	}
});
QualityCatGameLibrary.attachModule(StateManager,"StateManager");})();