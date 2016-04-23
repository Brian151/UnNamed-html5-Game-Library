/*not really a required file...
Just an example of how to launch the game*/

Game.prototype.init = function(mainCanvas) {
	this.state = "init";
	this.assets = new AssetManager(this,"assets/");
	this.canvas = document.getElementById("gameScreen")
	this.renderer = new GraphicsHandler(this.canvas);
	this.assets.loadAsset("image","pal_test/UF_evil_straight_08.png","UF");
	this.assets.loadAsset("image","pal_test/BH_good_03.png","BH");
	this.assets.loadAsset("image","pal_test/BH_good_pal2.png","BH_pal2");
	this.sprites = [];
	this.exportBox = tempCanvas = document.getElementById("export");
}

Game.prototype.tick = function(){
	this.assets.tick();
	//console.log("tick");
	if (this.state == "init"){
		if(this.assets.queuecomplete) {
			this.state = "play";
			//console.log("start game!");
			this.sprites.push(this.assets.requestAsset("image","UF"));
			this.sprites.push(this.assets.requestAsset("image","BH"));
			var pal1 = this.renderer.getPalette(this.sprites[0]);
			var pal2 = this.renderer.getPalette(this.sprites[1]);
			var pal3 = this.renderer.getPalette(this.assets.requestAsset("image","BH_pal2"));
			//var indexed = this.renderer.toIndexedColor(this.sprites[1]);
			this.sprites[1] = this.renderer.swapPalette(this.sprites[1],pal3,true);
			this.renderer.drawPalette(pal2,8,8,24);
		}
	}
	
	if(this.state == "play") {
		this.draw();
	}
}

Game.prototype.draw = function(){
	if(this.state == "play") {
	var x = 0;
	var y = 0;
		for (var i = 0; i < this.sprites.length; i++) {
			this.renderer.ctx.drawImage(this.sprites[i],x,y);
			//console.log(this.sprites[i].src)
			x += 100;
			if (x + 100 >= 600) {
				x = 0;
				y += 150;
			}
		}
	}
}

var game = null;
var loop = null;

window.onload = function(){
	game = new Game();
	game.init("gameScreen");
	loop = setInterval(function(){game.tick();},game.timing);
}