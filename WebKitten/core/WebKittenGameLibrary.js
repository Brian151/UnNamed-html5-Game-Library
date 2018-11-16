(function(tgt){
	var GameLib = {
		vers : [1,0,0],
		state : "init",
	}

	tgt.WebKitten$ = GameLib; // export GameLib as WebKitten$ to the target scope

	// core modules, generally required by any game
	var subs = [
		"ModuleLoader.js",
		"AssetManager.new.js",
		"GraphicsHandler.js",
		// "SoundSystem.js", // not working yet
		"InputManager.js"
	];
	var loaded = 0;

	// handlers for submodule loading
	function subLoad() {
		loaded++;
		if (loaded == subs.length) {
			GameLib.state = "ready";
		}
	}

	function subError() {
		GameLib.state = "error";
		throw new Error("WebKitten : failed to load a core module!");
	}

	// load required submodules
	for (var i=0; i < subs.length; i++) {
		var url = "core/" + subs[i];
		var script = document.createElement("script");
		script.type = "text/javascript";
		/*
			set the onload and onerror handlers of the script tag
		*/
		script.onload = subLoad;
		script.onerror = subError;
		script.src = url;
		document.body.appendChild(script);
	}
})(this); // 'this' refers to the global scope