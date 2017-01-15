/*not really a required file...
Just an example of how to launch/configure the game*/

Game.prototype.init = function(mainCanvas) {
	this.state = "play";
	this.canvas = document.getElementById(mainCanvas);
	this.graphics = GameObjs.renderer = new GraphicsHandler(this.canvas);
	this.loaders = [];
	this.loaders.push(this.loader = new PreloadScreen(this,300,200,{}));
	this.loaders.push(new ClassicLoaderBar(this,300,200,300,25,{}));
	this.loaders.push(new DonutLoader(this,300,200,75,25,{}));
	this.loaders.push(new BufferingScreen(this,300,200,75,25,{},{}));
	this.currentLoader = 0;
	this.progress = 0;
	this.complete = 5;
	for (var i=0; i < this.loaders.length; i++) {
		this.loaders[i].syncTo(this,"progress","complete");
	}
	this.countDown = 10;
	this.timer = 0;
	this.stateCooldown = false;
}

Game.prototype.tick = function(){
	if (this.progress >= this.complete) {
		this.progress = this.complete;
		if (!this.stateCooldown) {
			this.stateCooldown = true;
		} else {
			this.timer++;
			if (this.timer >= this.countDown) {
				this.stateCooldown = false;
				this.progress = 0;
				this.timer = 0;
				this.currentLoader++;
				if (this.currentLoader >= this.loaders.length) this.currentLoader = 0;
				this.loader = this.loaders[this.currentLoader];
			}
		}
	} else {
		this.progress += .01;
	}
	
	this.loader.tick();
	
	if(this.state == "play") {
		this.draw();
	}
}

Game.prototype.draw = function(){
	this.graphics.clearRect(0,0,600,400);
	this.loader.draw();
}