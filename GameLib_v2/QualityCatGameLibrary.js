"use strict";
var QualityCatBasicModuleRegistry = stampit.deepProps({
	modules : {}
}).methods({
	hasModule : function(id) {
		var out = false;
		if (typeof this.modules[id] != "undefined") {
			out = true;
		}
		return out;
	},
	addModule : function(mod,id) {
		this.modules[id] = mod;
	},
	getModule : function(id) {
		return this.modules[id];
	}
});

var QualityCatGameLibrary = stampit.compose(QualityCatBasicModuleRegistry,{
	methods : {
		attachModule : function(mod,id) {
			this[id] = mod;
		},
		hasAttachedModule(id) {
			var out = false;
			if (typeof this[id] != "undefined") {
				out = true;
			}
			return out;
		}
	}
})();
