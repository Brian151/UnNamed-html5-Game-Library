(function(tgt){
	var mods = [
		{
			id : "Failed",
			obj : function(){}
		}
	] // loaded modules, there's a default for load failure
	var paths = []; // urls with associated event listeners
	checkPath = function(path) { // check for duplicate url, it *could* happen
		for (var i=0; i < paths.length; i++) {
			var curr = paths[i];
			if (curr.url == path) {
				return i; // if a url was found, return its index
			}
		}
		return -1; // if a path wasn't found, return -1, as the array is zero-based
	}
	/* 
		The onLoad and onError attributes of a given path object are arrays of callback handlers
		This hopefully should deal with the 'unlikely' event two or more different modules try importing 
		another unloaded module at the sametime. Since loading a JS file is asyncronous...
	*/
	function onModuleLoad(numid) { 
		var handler = paths[numid].onLoad;
		for (var i=0; i < handler.length; i++) {
			handler[i]();
		}
	}
	function onModuleError(numid) {
		var handler = paths[numid].onError;
		for (var i=0; i < handler.length; i++) {
			handler[i]();
		}
	}
	function modules() { // the module handler object
		
	}
	/*
		A function to register a module
		obj is the module, it can be bascally anything
		id is a string identifying the module, and is used
		by requestModule() to retrieve it when another module requests it
	*/
	modules.registerModule = function(obj,id) {
		mods.push({
			id : id,
			obj : obj
		});
	}
	/*
		loadModule takes a url and two callback functions for load and error, respectively
	*/
	modules.loadModule = function(url,onLoad,onError) {
		var pathID = checkPath(url); // checking for a duplicate path
		if (pathID < 0) { // an attempt to load this module was not made yet
			pathID = paths.length;
			paths.push({
				url : url,
				onError : [],
				onLoad : []
			});
		}
		/*
			add the callback functions to the callback lists
		*/
		paths[pathID].onLoad.push(onLoad);
		paths[pathID].onError.push(onError);
		// create a new script element and set the type (just in case)
		var script = document.createElement("script");
		script.type = "text/javascript";
		/*
			set the onload and onerror handlers of the script tag
			Anonymous functions are used to wrap calls to the 
			onModuleLoad() and onModuleError() handlers
			so as to call them with the correct script ID# (the index in the paths array)
		*/
		script.onload = function(){onModuleLoad(pathID)};
		script.onerror = function(){onModuleError(pathID)};
		script.src = url;
		document.body.appendChild(script);
	}
	/*
		importModule takes a string of the format "package.package.module"
		and re-writes it as "package/package/module.js"
		It then calls loadModule() using the new string.
		It also passes along the provided callback functions
	*/
	modules.importModule = function(classpath,onLoad,onError) {
		var path = classpath.split(".").join("/") + ".js";
		this.loadModule(path,onLoad,onError);
	}
	/*
		requestModule() is used to retrieve a module by its ID
		It Also takes two callback functions.
		A properly coded module with depencies would first try requestModule()
		The onComplete() handler has no expected use and can do anything
		The onError() handler should attempt to invoke importModule()
		Failing this, a fatal exception should be thrown and execution halted,
		as the app probably cannot function if a single module fails to load.
		Additionally, a properly developed module should generally only 'import'
		dependencies once, when it intializes.
	*/
	modules.requestModule = function(id,onComplete,onError) {
		for (var i=0; i < mods.length; i++) {
			var curr = mods[i];
			if (curr.id == id) {
				onComplete();
				return curr.obj;
			}
		}
		onError();
		return mods[0] ; //aka FAILED
	}
	tgt.ModuleManager = modules;
	/*tgt.IMPORTMOD = modules.importModule;
	tgt.GETMOD = modules.requestModule;*/ // direct export of module loading functions to the WebKitten game library, disabled for now
})(WebKitten$); // WebKitten game library exists on the global scope, it HAS to
/*
	Future versions may allow tgt parameter to be changed, but most likely at the cost of adding another global variable (OUCH!)
	eval() would be quite acceptable for module-loading; and if used, would theorectically allow a situation of ZERO scope polution
	However, it was decided to rename eval() to 'evil()'*, and it cannot be trusted to work at all, especially in strict mode

	*it's still called eval(), but it's considered to be "evil" by most developers
*/