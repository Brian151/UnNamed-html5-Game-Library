/*not really a required file...
Just an example of how to launch the game*/

Game.prototype.init = function(mainCanvas) {
	this.state = "init";
	this.assets = new AssetManager(this,"assets/");
	this.assets.loadAsset("image","RainbowThing.png","rainbowTest");
	this.assets.loadAsset("txt","RainbowAnimation.json","rainbowTestAnim");
	this.canvas = document.getElementById(mainCanvas);
	this.renderer = GameObjs.renderer = new GraphicsHandler(this.canvas);
	this.sprites = [];
}

Game.prototype.tick = function(){
	this.assets.tick();
	//console.log("tick");
	if (this.state == "init"){
		if(this.assets.queuecomplete) {
			this.state = "play";
			//console.log("start game!");
			var spriteData = JSON.parse(this.assets.requestAsset("txt","rainbowTestAnim"));
			var spriteImage = this.assets.requestAsset("image","rainbowTest");
			var testSpriteD = new SpriteData(spriteData);
			this.sprites.push(new Sprite(100,100,spriteImage,testSpriteD));
		}
	}
	
	if(this.state == "play") {
		this.draw();
	}
}

Game.prototype.draw = function(){
	if(this.state == "play") {
		for(var i=0; i < this.sprites.length; i++) {
			this.sprites[i].draw();
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