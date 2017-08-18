function AssetManager(parent) {
	this.imgs = {};
	this.snds = {};
	this.txts = {}; //soon bringing-in JQUERY/AJAX, I'm sure
	this.assetCounter = 0;
	this.assetsLoaded = 0;
	this.queuecomplete = false;
	var self = this;
	
	this.onAssetLoaded = function(){
		self.assetsLoaded += 1;
		console.log("asset load!");
	}
	
	this.loadAsset = function(type,path,id){
		if (type == "image"){
			this.assetCounter += 1;
			this.imgs[id] = new Image();
			this.imgs[id].src = path;
			this.imgs[id].onload = this.onAssetLoaded;
		}
	}
	
	this.tick = function(){
		if (this.assetsLoaded == this.assetCounter){
			this.queuecomplete = true;
		} else {
			this.queuecomplete = false;
		}
	}
	
	this.requestAsset = function(assetID) {
	var out = undefined;
	out = this.imgs[assetID];
	return out;
	}
}

function InputManager(parent) {
	this.parent = parent;
	var self = this;
	this.timing = 30;
	this.keyStates = {};
	this.mouseState = {
		"mX" : 0,
		"mY" : 0,
		"down" : false
	};
	
	for (var i = 0; i < 512; i++) {
		this.keyStates["K_" + i] = {
			"id": i,
			"strID": String.fromCharCode(i),
			"cooldown": this.timing,
			"state": "inactive",
			"down": false
		};
	}
	
	this.parent.canvas.addEventListener("mousemove",function(event){
		var x = event.clientX - parent.canvas.offsetLeft;
		var y = event.clientY - parent.canvas.offsetTop;
		self.mouseState.mX = x;
		self.mouseState.mY = y;
	});
	
	this.parent.canvas.addEventListener("mousedown",function(event){
		self.mouseState.down = true;
	});
	
	this.parent.canvas.addEventListener("mouseup",function(event){
		self.mouseState.down = false;
	});
	
	document.addEventListener("keydown",function(event){
	//http://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
		switch(event.keyCode){
			case 37: case 39: case 38: case 40: // Arrow keys
			case 32: event.preventDefault(); break; // Space
			default: break; // do not block other keys
		}
		var current = self.keyStates["K_" + event.keyCode];
			if ((current.lock != "press") && (current.lock != "disabled")){
				current.cooldown = self.timing;
			}
			current.state = "active";
			current.down = true;
		//console.log("[controller] pressed key: " + event.keyCode);
	});
	
	document.addEventListener("keyup",function(event){
		var current = self.keyStates["K_" + event.keyCode];
			current.down = false;
			if (current.lock == "press") {
				current.lock = "enabled";
				current.cooldown = 0;
			}
	});
	
	this.checkMouseCollision = function(e) {
		var out = {"result":false};
		if(e.x + e.width >= this.mouseState.mX && e.x <= this.mouseState.mX && e.y + e.height >= this.mouseState.mY && e.y <= this.mouseState.mY){
			out.result = true;
			out.mX = 0 + this.mouseState.mX;
			out.mY = 0 + this.mouseState.mY;
		}
		return out;
	}
	
	this.checkKeyDown = function(keyID,keyName) {
		var out = false;
		var current = this.keyStates["K_" + keyID];
		if ((current.down) && (current.lock != "disabled")) {
			out = true;
		}
		return out;
	}
	
	this.checkKeyPress = function(keyID,keyName) {
		var out = false;
		var test = this.keyStates["K_" + keyID];
		if ((test.state == "active") && ((test.lock != "press") && (test.lock != "disabled"))) {
			out = true;
			test.state = "inactive";
			test.lock = "press";
			test.down = false;
			//test.cooldown = this.timing;
		}
		//console.log(out);
		return out;
	}
	
	this.tick =  function() {
		for (var i =0; i < this.keyStates.length; i++) {
			var current = this.keyStates["K_" + i];
			if (current.state == "active") {
				if (current.cooldown >= 1) {
					current.cooldown--;
				} else {
					current.state = "inactive";
				}
			}
		}
	}
	
}

function colorMultiply(top, bot) {
 return top * bot / 255;
}

function GraphicsHandler(canvas) {
	this.ctx = canvas.getContext("2d");
	//this.preRenderingCanvas = null;
	//document.innerHTML += "<canvas id=\"screenP\" width=\"" + 600 + "\" height=\"" + 400 + "\"></canvas>";
	this.preRenderingCanvas = document.getElementById("screenP");
	this.pR = this.preRenderingCanvas.getContext("2d");
	this.preRenderZone = document.getElementById("dynamicPre");
	//this.preRenderingCanvas.setAttribute("display","none");
	//a disgrace, this object needs to start pulling its own weight
	//Perhaps the next tech demo will focus on this!
	this.draw = function() {
	
	}
	
	// impl ---> GraphicsUtils.doImageEffects
	this.skinEffects = function(img,img2,effectData) {
		var effects = effectData;
		var eff_gray = effects.grayscale;
		var eff_color = effects.colorize;
		var eff_colorP = effects.colorPal;
		var eff_opacity = effects.opacity;
		var srcImg = img;
		var overlayImg = img2;
		this.preRenderZone.innerHTML += "<canvas id=\"tempPre\" width=\"" + srcImg.width + "\" height=\"" + srcImg.height + "\"></canvas>";
		var tempCanvas = document.getElementById("tempPre");
		var tempContext = tempCanvas.getContext("2d");
		tempContext.drawImage(srcImg,0,0);
		var imgData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
		if (eff_gray) console.log("grayscale effect enabled!");
		if (eff_color) console.log("colorize effect enabled!");
		if (eff_color) console.log("color palette effect enabled!");
		if (eff_opacity) console.log("opacity effect enabled!");
		for (var i=0; i < imgData.data.length; i += 4) {
			if (eff_gray) {
				var brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
				imgData.data[i] = brightness + eff_gray.postBright;
				imgData.data[i + 1] = brightness + eff_gray.postBright;
				imgData.data[i + 2] = brightness + eff_gray.postBright;
			}
			if(eff_opacity) imgData.data[i + 3] *= eff_opacity;
			if (eff_color) {
				imgData.data[i] = colorMultiply(imgData.data[i],eff_color.r);
				imgData.data[i+1] = colorMultiply(imgData.data[i+1],eff_color.g);
				imgData.data[i+2] = colorMultiply(imgData.data[i+2],eff_color.b);
			}
			if(eff_colorP) {
				imgData.data[i] = eff_colorP.r;
				imgData.data[i+1] = eff_colorP.g;
				imgData.data[i+2] = eff_colorP.b;
			}
		}
		tempContext.putImageData(imgData,0,0);
		tempContext.drawImage(overlayImg,0,0);
		var newImg = new Image(srcImg.width,srcImg.height);
		newImg.src = tempCanvas.toDataURL();
		return newImg;
	}
	
	
	this.preRenderPattern = function(src,w,h) {
		//console.log("pre-render pattern!");
		var pat = this.pR.createPattern(src,"repeat");
		var pw = this.pR.canvas.width;
		var ph =  this.pR.canvas.height;
		this.pR.fillStyle = pat;
		this.pR.fillRect(0,0,pw,ph);
		var wt = Math.round(w);
		var ht = Math.round(h);
		var imgPat = this.pR.getImageData(0,0,wt,ht);
		return imgPat;
	}
	
	this.drawPattern = function (src,x,y,w,h,notFixed,preRendered) {
		//console.log("PATTERN!");
		var img = src;
		if(notFixed){
			if(!preRendered){
			var pat = this.pR.createPattern(img,"repeat");
			this.pR.fillStyle = pat;
			var pw = this.pR.canvas.width;
			var ph =  this.pR.canvas.height;
			this.pR.fillRect(0,0,pw,ph);
			this.imgD = this.pR.getImageData(0,0,w,h);
			this.ctx.putImageData(this.imgD,x,y);
			} else {
				this.ctx.putImageData(img,x,y);
			}
		} else {
		var fillBackup = this.ctx.fillStyle;
		var pat = this.ctx.createPattern(img,"repeat");
		this.ctx.fillStyle = pat;
		this.ctx.fillRect(x,y,w,h);
		this.ctx.fillStyle = fillBackup;
		}
	}
	
	this.drawClippedImage = function(img,x,y,w,h,ix,iy,iw,ih){
		if(!iw){
			this.ctx.drawImage(img,ix,iy,w,h,x,y,w,h);
		} else {
			this.ctx.drawImage(img,ix,iy,iw,ih,x,y,w,h);
		}
		//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		//context.drawImage(img,ix,iy,w,h,x,y,w,h);
	}
}

function SoundSystem() {
	
}

function s9(parent,x,y,w,h,sliceData){
	this.parent = parent;
	//console.log(img);
	if(sliceData.type == "image"){
		this.isImageSlice = true;
		this.img = GameObjs.assets.requestAsset(sliceData.img);
		this.sliceData = slice9(this.img.width,this.img.height,sliceData.skin.t,sliceData.skin.r,sliceData.skin.b,sliceData.skin.l);
	} else if (sliceData.type == "color") {
		this.color = sliceData.color;
		var tempW = sliceData.w;
		var tempH = sliceData.h;
		this.sliceData = slice9(tempW,tempH,sliceData.skin.t,sliceData.skin.r,sliceData.skin.b,sliceData.skin.l);
	}
	if (sliceData.effects.aero) {
		this.aero = true;
		this.aeroImage = GameObjs.assets.requestAsset("AeroBG");
		if (sliceData.effects.aero2600) this.aeroImage = GameObjs.assets.requestAsset("AeroBG-atari")
	}
	if (sliceData.effects.grayscale || sliceData.effects.colorize || sliceData.effects.opacity || sliceData.effects.colorPal) {
		this.img2 = GameObjs.assets.requestAsset(sliceData.img2);
		this.img = GameObjs.renderer.skinEffects(this.img,this.img2,sliceData.effects);
	}
	//this.parent.renderer.ctx.drawImage(this.img,0,0);
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	//this.color = "#cccccc";
	
	//console.log(JSON.stringify(sliceData.skin));
	//console.log(JSON.stringify(this.sliceData));
	//console.log(this.img.src);
	//console.log(this.x + " , " + this.y);
	//console.log(this.width + " X " + this.height);
	this.minW = this.sliceData.middle.minW;
	this.minH = this.sliceData.middle.minH;
	
	this.tick = function(){}
	
	this.draw = function(){
		//var tcol = this.parent.renderer.ctx.fillStyle;
		//this.parent.renderer.ctx.fillStyle = this.color;
		//this.parent.renderer.ctx.fillRect(this.x-3,this.y,this.width+6,this.height);
		//this.parent.renderer.ctx.fillStyle = tcol;
		if(this.isImageSlice){
			var tl = this.sliceData.topLeft;
			var t = this.sliceData.top;
			var tr = this.sliceData.topRight;
			var r = this.sliceData.right;
			var br = this.sliceData.bottomRight;
			var b = this.sliceData.bottom;
			var bl = this.sliceData.bottomLeft;
			var l = this.sliceData.left;
			GameObjs.renderer.drawClippedImage(this.img,this.x - tl.width,this.y - tl.height,tl.width,tl.height,tl.x,tl.y);
			//this.drawClippedImage = function(img,x,y,w,h,ix,iy)
			GameObjs.renderer.drawClippedImage(this.img,this.x,this.y - t.height,this.width,t.height,t.x,t.y,t.width,t.height);
			if (this.aero) GameObjs.renderer.drawClippedImage(this.aeroImage,this.x,this.y - (t.height - 2),this.width,t.height - 4,this.x,this.y - (t.height - 2));
			GameObjs.renderer.drawClippedImage(this.img,this.x + this.width,this.y - tr.height,tr.width,tr.height,tr.x,tr.y);
			GameObjs.renderer.drawClippedImage(this.img,this.x - l.width,this.y,tl.width,this.height,l.x,l.y,l.width,l.height);
			GameObjs.renderer.drawClippedImage(this.img,this.x + this.width,this.y,r.width,this.height,r.x,r.y,r.width,r.height);
			GameObjs.renderer.drawClippedImage(this.img,this.x - bl.width,this.y + this.height,bl.width,bl.height,bl.x,bl.y);
			GameObjs.renderer.drawClippedImage(this.img,this.x,this.y + this.height,this.width,b.height,b.x,b.y,b.width,b.height);
			GameObjs.renderer.drawClippedImage(this.img,this.x + this.width,this.y + this.height,br.width,br.height,br.x,br.y);
		} else {
			var tempCol = GameObjs.renderer.ctx.fillStyle;
			GameObjs.renderer.ctx.fillStyle = this.color;
			var tl = this.sliceData.topLeft;
			var t = this.sliceData.top;
			var tr = this.sliceData.topRight;
			var r = this.sliceData.right;
			var br = this.sliceData.bottomRight;
			var b = this.sliceData.bottom;
			var bl = this.sliceData.bottomLeft;
			var l = this.sliceData.left;
			GameObjs.renderer.ctx.fillRect(this.x - tl.width,this.y - tl.height,tl.width,tl.height);
			GameObjs.renderer.ctx.fillRect(this.x,this.y - t.height,this.width,t.height);
			GameObjs.renderer.ctx.fillRect(this.x + this.width,this.y - tr.height,tr.width,tr.height);
			GameObjs.renderer.ctx.fillRect(this.x - l.width,this.y,tl.width,this.height);
			GameObjs.renderer.ctx.fillRect(this.x + this.width,this.y,r.width,this.height);
			GameObjs.renderer.ctx.fillRect(this.x - bl.width,this.y + this.height,bl.width,bl.height);
			GameObjs.renderer.ctx.fillRect(this.x,this.y + this.height,this.width,b.height);
			GameObjs.renderer.ctx.fillRect(this.x + this.width,this.y + this.height,br.width,br.height);
			GameObjs.renderer.ctx.fillStyle = tempCol;
		}
	}
}

function checkNull(value){
	if (typeof value === "null" || typeof value === "undefined") {
		return true;
	} else {
		return false;
	}
}

var UIDataLinker = {};
var UIFCNLinker = {};

var GameObjs = {};
function Game() {
	this.state = "standby";
	var self = this;
	this.timing = 33; //approx 30 FPS
	
	this.setFPS = function(fps){
		this.timing = Math.round(1000 / fps);
	}
	
	this.focusUI = function(targetUI) {
		for (var i = 0; i < this.uiPanes.length; i++) {
			var currPane = this.uiPanes[i];
			if(currPane === targetUI) {
				this.focusedUI = currPane;
				console.log("found target UI!");
				this.uiPanes.splice(i,1);
				this.uiPanes.push(this.focusedUI);
			}
		}
	}
	
	this.init = function(canvasID) {
		this.state = "load";
		this.canvas = document.getElementById(canvasID);
		this.controller = new InputManager(this);
		this.assets = new AssetManager(this);
		this.renderer = new GraphicsHandler(this.canvas);
		this.sound = new SoundSystem(); //dead weight, sounds aren't yet implemented.
		GameObjs.controller = this.controller;
		GameObjs.assets = this.assets;
		GameObjs.renderer = this.renderer;
		GameObjs.sound = this.sound;
		this.running = true;
		this.uiPanes = [];
		this.totalTicks = 0;
		this.assets.loadAsset("image","assets/UIgfx/Aero-gradient2.png","AeroBG");
		this.assets.loadAsset("image","assets/UIgfx/AeroSkin.png","Aero");
		this.assets.loadAsset("image","assets/UIgfx/AeroSkinOverlay.png","AeroOver");
		this.assets.loadAsset("image","assets/UIgfx/Aero-gradient2-Atari2600.png","AeroBG-atari");
		this.assets.loadAsset("image","assets/UIgfx/AeroSkin-Atari2600.png","Aero-atari");
		this.assets.loadAsset("image","assets/UIgfx/AeroSkinOverlay-Atari2600.png","AeroOver-atari");
		
		var aeroSlices = {
			"t" : 29,
			"r" : 8,
			"b" : 8,
			"l" : 8
		};
		this.popupAeroTemplate = {
			"type" : "skinned_component",
			"overflowX" : 0,
			"overflowY" : 0,
			"freePos" : true,
			"background" : {
				"color" : "#ffffff"
			},
			"title" : {
				"x" : -8,
				"y" : -29,
				"w" : 0,
				"h" : 29,
				"xO" : 16,
				"yO" : 0,
				"txt" : {
					"x" : 0,
					"y" : -8,
					"txt" : "Aero Pane (Graphite)",
					"align" : "center",
					"font" : {
						"w" : "bold",
						"s" : "20px",
						"f" : "Arial",
						"c" : "#ffffff"
					}
				}
			},
			"rX" : {
				"x" : 0,
				"y" : 0,
				"w" : 8,
				"h" : 0,
				"xO" : 0,
				"yO" : 0,
			},
			"rY" : {
				"x" : 0,
				"y" : 0,
				"w" : 0,
				"h" : 8,
				"xO" : 0,
				"yO" : 0,
			},
			"debug" : false,
			"skin" : {
				"slice" : "slice-9",
				"type" : "image",
				"skin" : aeroSlices,
				"img" : "Aero",
				"img2" : "AeroOver",
				"effects" : {
					"aero" : true,
					"grayscale" : {
						"postBright" : 0
					},
					"colorize" : {
						"r" : 16,
						"g" : 16,
						"b" : 16,
					},
					"opacity" : .8
				}
			}
		};
		
		this.popupAeroTemplateD = {
			"type" : "skinned_component",
			"overflowX" : 0,
			"overflowY" : 0,
			"freePos" : true,
			"background" : {
				"color" : "#ffffff"
			},
			"title" : {
				"x" : -8,
				"y" : -29,
				"w" : 0,
				"h" : 29,
				"xO" : 16,
				"yO" : 0,
				"txt" : {
					"x" : 0,
					"y" : -8,
					"txt" : "Aero Pane (Default)",
					"align" : "center",
					"font" : {
						"w" : "bold",
						"s" : "20px",
						"f" : "Arial",
						"c" : "#000000"
					}
				}
			},
			"rX" : {
				"x" : 0,
				"y" : 0,
				"w" : 8,
				"h" : 0,
				"xO" : 0,
				"yO" : 0,
			},
			"rY" : {
				"x" : 0,
				"y" : 0,
				"w" : 0,
				"h" : 8,
				"xO" : 0,
				"yO" : 0,
			},
			"debug" : false,
			"skin" : {
				"slice" : "slice-9",
				"type" : "image",
				"skin" : aeroSlices,
				"img" : "Aero",
				"img2" : "AeroOver",
				"effects" : {
					"aero" : true,
					"opacity" : .8
				}
			}
		};
		
		this.popupAeroTemplateP = {
			"type" : "skinned_component",
			"overflowX" : 0,
			"overflowY" : 0,
			"freePos" : true,
			"background" : {
				"color" : "#ffffff"
			},
			"title" : {
				"x" : -8,
				"y" : -29,
				"w" : 0,
				"h" : 29,
				"xO" : 16,
				"yO" : 0,
				"txt" : {
					"x" : 0,
					"y" : -8,
					"txt" : "Aero Pane (Custom - color: Pink , opacity: 100%)",
					"align" : "center",
					"font" : {
						"w" : "bold",
						"s" : "20px",
						"f" : "Arial",
						"c" : "#000000"
					}
				}
			},
			"rX" : {
				"x" : 0,
				"y" : 0,
				"w" : 8,
				"h" : 0,
				"xO" : 0,
				"yO" : 0,
			},
			"rY" : {
				"x" : 0,
				"y" : 0,
				"w" : 0,
				"h" : 8,
				"xO" : 0,
				"yO" : 0,
			},
			"debug" : false,
			"skin" : {
				"slice" : "slice-9",
				"type" : "image",
				"skin" : aeroSlices,
				"img" : "Aero",
				"img2" : "AeroOver",
				"effects" : {
					"aero" : true,
					"grayscale" : {
						"postBright" : 50
					},
					"colorize" : {
						"r" : 255,
						"g" : 127,
						"b" : 182
					}
				}
			}
		};
		
		this.popupAeroTemplateA = {
			"type" : "skinned_component",
			"overflowX" : 0,
			"overflowY" : 0,
			"freePos" : true,
			"background" : {
				"color" : "#ECECEC"
			},
			"title" : {
				"x" : -8,
				"y" : -29,
				"w" : 0,
				"h" : 29,
				"xO" : 16,
				"yO" : 0,
				"txt" : {
					"x" : 0,
					"y" : -8,
					"txt" : "Aero Pane (Atari 2600 - color: #DCAC84)",
					"align" : "center",
					"font" : {
						"w" : "bold",
						"s" : "20px",
						"f" : "Arial",
						"c" : "#000000"
					}
				}
			},
			"rX" : {
				"x" : 0,
				"y" : 0,
				"w" : 8,
				"h" : 0,
				"xO" : 0,
				"yO" : 0,
			},
			"rY" : {
				"x" : 0,
				"y" : 0,
				"w" : 0,
				"h" : 8,
				"xO" : 0,
				"yO" : 0,
			},
			"debug" : false,
			"skin" : {
				"slice" : "slice-9",
				"type" : "image",
				"skin" : aeroSlices,
				"img" : "Aero-atari",
				"img2" : "AeroOver-atari",
				"effects" : {
					"aero" : true,
					"aero2600" : true,
					"colorPal" : {
						"r" : 220,
						"g" : 172,
						"b" : 132
					}
				}
			}
		};
		this.isUIManager = true;
		this.hasFocusedUI = false;
		this.focusedUI = null;
		this.x = 0;
		this.y = 0;
		//this.uiPanes.push(this.customWindow = new s9(this,10,50,400,200,"LunaIce",lunaSlices));
	}

	this.draw = function() {
		this.renderer.ctx.clearRect(0,0,1000,1000);
		for (var i=0; i < this.uiPanes.length; i++) {
			this.uiPanes[i].draw();
		}
	}
	
	this.tick = function() {
		this.assets.tick();
		if (this.state == "load"){
			if(this.assets.queuecomplete) {
				this.state = "play";
				this.uiPanes.push(this.customWindow = new SkinnedUIComponent(this,10,50,500,200,this.popupAeroTemplate));
				this.uiPanes.push(new SkinnedUIComponent(this,30,100,500,200,this.popupAeroTemplateD));
				this.uiPanes.push(new SkinnedUIComponent(this,50,150,500,200,this.popupAeroTemplateP));
				this.uiPanes.push(new SkinnedUIComponent(this,70,200,500,200,this.popupAeroTemplateA));
			}
		}
		for (var i=this.uiPanes.length-1; i >= 0; i--) {
			this.uiPanes[i].tick();
		}
		
		//only hapens during "play" or "menu" game states:
		if(this.state == "play"){
			
		}//end
		
		//only happens during the "play" game state:
		if(this.state == "play"){
			
		}//end
		
		//always runs:
		this.draw();//end
	}
}

var game = null;
var loop = null;

window.onload = function(){
	game = new Game();
	game.init("gameScreen");
	loop = setInterval(function(){game.tick();},game.timing);
}