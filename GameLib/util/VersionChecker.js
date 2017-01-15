var VersionChecker = new function() {
	this.hasLoadedJSONRemote = false;
	this.hasLoadedJSONLocal = false;
	this.fallBackVersionData = {
		name : "Quality Cat Game Library",
		major : 0,
		minor : 7,
		revision : 0,
		releaseType : "indev-alpha",
		platform : "HTML5"
	};
}();
VersionChecker.init = function() {
	//cannot do this right now, as we need to link to the version JSON on github, that obviously doesn't exist yet!
}