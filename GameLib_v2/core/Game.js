(function(){
"use strict";
var Game = stampit.props({
	state : "boot",
	timingTick : 33,
	timingDraw : 0,
	deltaTime : 0,
	deltaTime2 : 0,
	timeNow : 0,
	timeLast : 0,
	ticks : 0,
	draws : 0,
	width : 0,
	height : 0,
}).methods({
	setUPS : function(ups){
		if (ups > 0)
			this.timingTick = Math.round(1000 / ups);
		else
			this.timingTick = Math.round(1000 / 1);
	},
	setFPS : function(fps) {
		if(fps > 0)
			this.timingDraw = Math.round(1000 / fps);
		else
			this.timingDraw = 0;
	},
	draw : function(){},
	tick : function(){},
	run : function() {
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
	},
	start : function(width,height) {
		this.width = width;
		this.height = height;
		this.run();
	}
}).init(function(){
	this.timeNow = Date.now();
	this.timeLast = this.timeNow;
});

QualityCatGameLibrary.attachModule(Game,"Game");
})();