(function(tgt){
	var Game = function() {
		this.state = "standby";
		var self = this;
		this.timingTick = 33; //approx 30 FPS
		this.timingDraw = 0;
		this.deltaTime = 0;
		this.deltaTime2 = 0;
		this.timeNow = Date.now();
		this.timeLast = this.timeNow;
		this.ticks = 0;
		this.draws = 0;
	}
	//set updates per second (game tick rate)
	Game.prototype.setUPS = function(ups){
		if (ups > 0)
			this.timingTick = Math.round(1000 / ups);
		else
			this.timingTick = Math.round(1000 / 1);
	}
	//set frames per second (game draw rate)
	Game.prototype.setFPS = function(fps){
		if(fps > 0)
			this.timingDraw = Math.round(1000 / fps);
		else
			this.timingDraw = 0;
	}
	/*
		most game methods are placeholders, left intentionally empty, since the Game object is intended to
		be customized to the specific programmer's desires or requirements
		This is subject to change in the future
	*/
	Game.prototype.init = function(canvasID) {
		this.state = "intitialize";
		this.canvas = document.getElementById(canvasID);
	}
	Game.prototype.draw = function() {
		// this.renderer.ctx.clearRect(0,0,1000,1000); //need reliable way to deal with canvas width
	}
	Game.prototype.tick = function() {}
	Game.prototype.run = function() {
		this.timeNow = Date.now();
		this.deltaTime += (this.timeNow - this.timeLast) / this.timingTick;
		this.deltaTime2 += (this.timeNow - this.timeLast) / this.timingDraw;
		this.timeLast = this.timeNow;
		//check update timer
		if (this.deltaTime >= 1) {
			this.deltaTime=0;
			this.tick();
		}
		//check render timer
		if ((this.deltaTime2 >= 1) || this.timingTick == 0) {
			this.deltaTime2=0;
			this.draw();
		}
		requestAnimationFrame(this.run.bind(this));
	}
	tgt.Game = Game; // export Game
})(WebKitten$);