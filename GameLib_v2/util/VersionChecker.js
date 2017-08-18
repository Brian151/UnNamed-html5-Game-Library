(function(){
"use strict";
var VersionChecker = stampit.staticProperties({
	hasLoadedJSONRemote : false,
	hasLoadedJSONLocal : false,
	remotePath : "https://raw.githubusercontent.com/Brian151/UnNamed-html5-Game-Library/master/GameLib/meta/version.json",
	localPath : "Gamelib/meta/version.json",
	remoteInfo : "nope",
	localInfo : "nope",
	fallBackVersionData : {
		name : "Quality Cat Game Library",
		major : 0,
		minor : 7,
		revision : 3,
		releaseType : "indev-alpha",
		platform : "HTML5"
	},
	errors : {
		notes : "ERR_NOTES : Cannot display release notes, one or both of the version info files could not be loaded!",
		XHR1 : "ERR_XHR1 : Could not load remote version.json!",
		XHR2 : "ERR_XHR2 : Could not load local version.json!",
		version : "ERR_VERSION : Cannot compare versions at this time, one or both of the version info files could not be loaded!"
	}
	
}).statics({
	load : function(onSuccess,onError) {
		var XHRRemote = new XMLHttpRequest();
		var XHRLocal = new XMLHttpRequest();
		var self = this;
		XHRRemote.onreadystatechange = function() {
			if (XHRRemote.readyState == 4 && XHRRemote.status >= 200 && XHRRemote.status < 400) {
				self.remoteInfo = JSON.parse(XHRRemote.responseText); //fun fact: try/catch is USELESS here...
				self.hasLoadedJSONRemote = true;
				self.onXHRLoaded(onSuccess);
			} else if (XHRRemote.readyState == 4 && XHRRemote.status >= 400) {
				//this happens, you get a lovely JSON.parse() error
				onError();
				self.showError(self.errors.XHR1);
			}
		}
		XHRLocal.onreadystatechange = function() {
			if (XHRLocal.readyState == 4 && XHRLocal.status >= 200 && XHRLocal.status < 400) {
				self.localInfo = JSON.parse(XHRLocal.responseText); //fun fact: try/catch is USELESS here...
				self.hasLoadedJSONLocal = true;
				self.onXHRLoaded(onSuccess);
			} else if (XHRLocal.readyState == 4 && XHRLocal.status >= 400) {
				//this happens, you get a lovely JSON.parse() error
				onError();
				self.showError(self.errors.XHR2);
			}
		}
		XHRRemote.open("GET", this.remotePath, true);
		XHRLocal.open("GET", this.localPath, true);
		XHRRemote.send();
		XHRLocal.send();
	},
	showReleaseNotes : function(type) {
		if (!this.hasLoadedJSONLocal || !this.hasLoadedJSONRemote) {
			var self = this;
			this.init(function(){
				self.showReleaseNotes(type);
			},
			function() {self.showError(self.errors.notes);});
			return;
		} else {
			if (type == "local" || type == "both") {
				console.log("RELEASE NOTES - current version:");
				var localNotes = this.localInfo.releaseNotes;
				for (var i=0; i < localNotes.length; i++) {
					var curr = localNotes[i];
					console.log((i + 1) + ": " + curr);
				}
			}
			if (type == "remote" || type == "both") {
				console.log("RELEASE NOTES - latest verion:");
				var remoteNotes = this.remoteInfo.releaseNotes;
				for (var i=0; i < remoteNotes.length; i++) {
					var curr = remoteNotes[i];
					console.log((i + 1) + ": " + curr);
				}
			}
		}
	},
	checkForUpdate : function() {
		if (!this.hasLoadedJSONLocal || !this.hasLoadedJSONRemote) {
			var self = this;
			this.init(function(){
				self.checkForUpdate();
			},
			function() {self.showError(self.errors.version);});
			return;
		} else {
			var outdated = (
			(this.remoteInfo.major > this.localInfo.major) ||
			(this.remoteInfo.minor > this.localInfo.minor) ||
			(this.remoteInfo.revision > this.localInfo.revision));
			if (outdated)
				console.log("There is a newer build available on github!");
			else
				console.log("Your version is up to date!");
		}
	},
	displayCurrentBuildInfo : function(useFallback) {
		if (!useFallback) {
			if (!this.hasLoadedJSONLocal) {
				var self = this;
				this.init(function(){
					self.displayCurrentBuildInfo();
				},
				function() {self.displayCurrentBuildInfo(true);});
				return;
			} else if (this.hasLoadedJSONLocal) {
				var vi = this.localInfo;
				var viStr = vi.name + 
				"(" + vi.platform + ") : " + 
				"v" + vi.major  + "." + vi.minor + "." + vi.revision + 
				" [" + vi.releaseType + "]"; 
				console.log(viStr);
			}
		} else {
			var fb = this.fallBackVersionData;
			var fbStr = fb.name + 
			"(" + fb.platform + ") : " + 
			"v" + fb.major  + "." + fb.minor + "." + fb.revision + 
			" [" + fb.releaseType + "]" +
			" {USED FALLBACK VERSION INFO}"; 
			console.log(fbStr);
		}
	},
	showError : function(errorMsg) {
		console.error("Error : VersionChecker." + errorMsg);
	},
	onXHRLoaded : function(onSuccess) {
		if (this.hasLoadedJSONLocal && this.hasLoadedJSONRemote) {
			if (typeof onSuccess == "function") 
				onSuccess();
		}
	}
});
QualityCatGameLibrary.attachModule(VersionChecker,"Version");
})();