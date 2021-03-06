(function(){
"use strict";
var AssetManager = stampit.deepProps({
	// These store the loaded assets, more work needed
	// May convert to arrays
	imgs : {}, //images
	snds : {}, //sounds not yet implemented!
	txts : {}, //XMLHTTPREQUESTS are used!
	bins : {}, //XMLHTTPRequests are used!
	pendingXHRs = [],
	pendingAssets = []
}).props({
	assetCounter : 0,
	assetsLoaded : 0,
	queuecomplete : false,
	assetsPath : path,
	limRequest : 5,
	usedRequests : 0
}).methods({
	setPath : function(path) {
		this.assetsPath = path;
	},
	attach : function(parent) {
		this.parent = parent;
	},
	//see if more specific stuff can be done, test showing what asset id was loaded in debug log!
	onAssetLoaded : function(id) {
		this.assetsLoaded++;
		this.usedRequests--;
		this.pendingAssets[id][3] = "complete"
		//console.log("asset load!");
		//console.log(this.assetsLoaded);
	},
	onXMLHTTPLoaded : function(id,pendingXMLHTTP,text) {
		this.txts[id] = text; //still need to handle bin
		for (var i = 0; i < this.pendingXHRs.length; i++) {
			var curr = this.pendingXHRs[i];
			if(curr === pendingXMLHTTP) {
				this.pendingXHRs.splice(i,1);
				break;
			}
		}
		console.log("XMLHTTP LOADED! (" + id + ")");
	},
	//needs to be fleshed-out further!
	queueAsset : function(type,path,id) {
		this.assetCounter++;
		var self = this;
		if (type == "img"){
			this.pendingAssets.push(["img",id,path]);
			console.log("queue image!");
		}
		if (type == "txt") {
			this.pendingAssets.push(["txt",id,path]);
			console.log("queue text!");
		}
		//these are not yet supported!
		/*
		if (type == "snd") {
			this.pendingAssets.push(["snd",id,path]);
		}
		if (type == "bin") {
			this.pendingAssets.push(["bin",id,path]);
		}
		if (type == "lib") {
			this.pendingAssets.push(["bin",id,path]);
		}
		*/
	},
	tick : function() {
		var queueSize = this.pendingAssets.length;
		var used = this.usedRequests;
		var max = this.limRequest;
		if (queueSize > 0 && used < max && !this.pauseLoader) {
			for (var i=0; i < queueSize; i++) {
				var temp = this.pendingAssets[i];
				if (temp.length < 4) {
					this.loadAsset(temp,i);
					this.usedRequests++;
				}
				if (used >= max) {
					break;
				}
			}
		}
		if (queueSize >= 1000) {
			this.pauseLoader = true; //keep queue from growing uncontrollably...
		}
		if (used == 0 && queueSize > 0) {
			for (var i = queueSize - 1; i > -1; i--) {
				var curr = this.pendingAssets[i][3];
				if (curr == "complete" || curr == "failed") {
					this.pendingAssets.splice(i,1);
				}
			}
			if (this.pauseLoader) {
				this.pauseLoader = false;
			}
		}
		if (this.assetsLoaded == this.assetCounter){
			this.queuecomplete = true;
			//console.log("all assets loaded!");
		} else {
			this.queuecomplete = false;
			//console.log(this.assetsLoaded + " / " + this.assetCounter);
		}
	},
	requestAsset : function(type,assetID) {
		var out = undefined;
		//console.log(type);
		if (type == "img") out = this.imgs[assetID];
		if (type == "txt") out = this.txts[assetID];
		return out;
	},
	loadAsset : function() {
		var self = this;
		this.pendingAssets[numID].push("loading");
		var type = assetRequest[0];
		var id = assetRequest[1];
		var path = assetRequest[2];
		switch (type) {
			case "img" :
				this.imgs[id] = new Image();
				this.imgs[id].src = this.assetsPath + path;
				this.imgs[id].onload = function(){self.onAssetLoaded(numID);};
				break;
			case "txt" :
				var xmlhttpi = this.pendingXHRs.push(new XMLHttpRequest()) - 1;
				var xmlhttp = this.pendingXHRs[xmlhttpi];
				xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					self.onXMLHTTPLoaded(id,xmlhttp,xmlhttp.responseText,"txt");
					xmlhttp.abort(); //let's clean this up
					self.onAssetLoaded(numID);
				}
			};
			xmlhttp.open("GET", this.assetsPath + path, true);
			xmlhttp.send();
				break;
			/*case "snd" :
				break;
			case "bin" :
				break;
			case "lib" :
				break;
			*/
			default:
				break;
		}
	},
	
});
QualityCatGameLibrary.attachModule(AssetManager,"AssetManager");})():