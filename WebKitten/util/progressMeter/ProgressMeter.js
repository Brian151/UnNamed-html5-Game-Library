(function(){
	"use strict";

	/*
		module import and export stuff
		TODO: make ModuleLoader implement this itself?
	*/
	var MathUtils = null;
	function modLoaded() {
		MathUtils = WebKitten$.requestModule("MathUtils",function(){},function(){});
	}
	function modError() {
		throw new Error("WebKitten ProgressMeter : failed to load dependency!");
	}
	WebKitten$.ModuleManager.requestModule("MathUtils",modLoaded,function(){
		WebKitten$.ModuleManager.importModule("utils.MathUtils",modLoaded,modError);
	});
	WebKitten$.registerModule(ProgressMeter,"ProgressMeter");
	WebKitten$.registerModule(ClassicProgressBar,"ProgressBar");
	WebKitten$.registerModule(DonutMeter,"ProgressDonut");
	WebKitten$.registerModule(BufferingMeter,"BufferingMeter");

	/*
		Basic Progress Meter object
		Just displays a percentage
	*/
	var ProgressMeter = function(game,x,y,colors) {
		this.parent = game;
		this.center = {x:x,y:y};
		this.msg = 0;
		this.colorBG = colors.c1 || "#000000";
		this.colorFG = colors.c2 || "#0077ff";
		this.colorBorder = colors.c3 || "#333333";
	}
	// probably will can this
	ProgressMeter.prototype.syncTo = function(target,progress,complete) {
		this.sycned = true;
		this.target = target;
		this.stats = [progress,complete];
	}
	/*
		Update method, probaby called by a 'manager' object
		(like the main game object)
	*/
	ProgressMeter.prototype.tick = function() {
		if (this.sycned) {
			this.totalProgress = (this.target[this.stats[0]] / this.target[this.stats[1]]);
			if(this.totalProgress > 1) this.totalProgress = 1;
			this.msg = this.totalProgress;
		}
	}
	/*
		draw method
		called in the render loop
		TODO!!! 
			remove fairly hard-coded (and ugly) render calls
	*/
	ProgressMeter.prototype.draw = function() {
		this.parent.graphics.ctx.fillStyle = this.colorFG;
		this.parent.graphics.ctx.strokeStyle = this.colorBorder;
		this.parent.graphics.ctx.lineWidth = 3;
		this.parent.graphics.ctx.textAlign = "center";
		this.parent.graphics.ctx.font = "64px Verdana";
		var perc = Math.round(this.msg * 100);
		this.parent.graphics.ctx.fillText(perc + " %",this.center.x,this.center.y);
		this.parent.graphics.ctx.strokeText(perc + " %",this.center.x,this.center.y);
	}
	/*
		Progress Bar Object
		Displays percentage and a bar
		extends ProgressMeter (duh)
	*/
	var ClassicProgressBar = function(game,x,y,width,height,colors) {
		ProgressMeter.call(this,game,x,y,colors);
		this.width = width;
		this.height = height;
		this.width2 = Math.floor(this.width / 2);
		this.height2 = Math.floor(this.height / 2);
	}
	/*
		barebones basic class extension
	*/
	ClassicProgressBar.prototype = Object.create(ProgressMeter.prototype);
	ClassicProgressBar.constructor = ClassicLoaderBar;
	/*
		Only the render method has been overriden,
		because the tick() function remains the same
	*/
	ClassicProgressBar.prototype.draw = function() {
		this.parent.graphics.ctx.lineWidth = 3;
		this.parent.graphics.ctx.fillStyle = this.colorBG;
		this.parent.graphics.fillRect(this.center.x - this.width2,this.center.y - this.height2,this.width,this.height);
		this.parent.graphics.ctx.fillStyle = this.colorFG;
		this.parent.graphics.fillRect(this.center.x - this.width2,this.center.y - this.height2,Math.round(this.width * this.totalProgress),this.height);
		this.parent.graphics.ctx.strokeStyle = this.colorBorder;
		this.parent.graphics.strokeRect(this.center.x - this.width2,this.center.y - this.height2,this.width,this.height);
		
		this.parent.graphics.ctx.fillStyle = this.colorFG;
		this.parent.graphics.ctx.strokeStyle = this.colorBorder;
		this.parent.graphics.ctx.textAlign = "center";
		this.parent.graphics.ctx.font = "64px Verdana";
		var perc = Math.round(this.msg * 100);
		this.parent.graphics.ctx.fillText(perc + " %",this.center.x,this.center.y + this.height + 48);
		this.parent.graphics.ctx.strokeText(perc + " %",this.center.x,this.center.y + this.height + 48);
	}
	/*
		Donut (torus) progress meter
		displays a ring-shaped progress meter
		with a percentage in the center
	*/
	var DonutMeter = function(game,x,y,radius,thickness,colors) {
		ProgressMeter.call(this,game,x,y,colors);
		this.radius = radius;
		this.thickness = thickness;
	}
	// PROTOTYPE OOP EXTENSION AGAIN
	DonutMeter.prototype = Object.create(ProgressMeter.prototype);
	DonutMeter.constructor = DonutMeter;
	/*
		Render method uses arc() to draw the
		torus
	*/
	DonutMeter.prototype.draw = function() {
		this.parent.graphics.ctx.fillStyle = this.colorFG;
		var angleStart = MathUtils.radians(270);
		var aTemp = Math.round(this.totalProgress * 360);
		var angle = MathUtils.radians(270 + aTemp);
		this.parent.graphics.beginPath()
		this.parent.graphics.arc(this.center.x,this.center.y,this.radius + this.thickness,angleStart,angle, false); // outer (filled)
		this.parent.graphics.arc(this.center.x,this.center.y,this.radius,angle,angleStart, true); // outer (unfills it)
		this.parent.graphics.fill();
		
		this.parent.graphics.ctx.textAlign = "center";
		this.parent.graphics.ctx.font = "56px Verdana";
		var perc = Math.round(this.msg * 100);
		this.parent.graphics.ctx.fillText(perc,this.center.x,this.center.y + 16);
	}
	/*
		Buffering Meter
		(also called a "throbber", officially)
		Displays a ring of circles that spins
		Displays no progress
	*/
	var BufferingMeter = function(game,x,y,radius,thickness,colors,config) {
		ProgressMeter.call(this,game,x,y,colors);
		this.radius = radius;
		this.thickness = thickness;
		
		//set-up a default style for this later...
		this.totalChilds = 6;
		this.startAngle = MathUtils.clampAngle(270 + (630/6));
		this.displayText = false;
		this.increment = 10;
		this.increment2 = MathUtils.radians(360/6);
		this.angle = 0;
		
		
	}
	// PROTOTYPE EXTENSION AGAIN...
	BufferingMeter.prototype = Object.create(ProgressMeter.prototype);
	BufferingMeter.constructor = ClassicLoaderBar;
	BufferingMeter.prototype.tick = function() {
		this.angle = MathUtils.clampAngle(this.angle += this.increment);
	}
	/*
		This time, arc() is used to draw a ring of circles
		around a cener point
	*/
	BufferingMeter.prototype.draw = function() {
		this.parent.graphics.ctx.fillStyle = this.colorFG;
		var angle2 = MathUtils.radians(MathUtils.clampAngle(this.startAngle + this.angle));
		for (var i=0; i < this.totalChilds; i++) {
			var pos = MathUtils.cartFromPolar(this.radius,angle2);
			this.parent.graphics.beginPath();
			this.parent.graphics.arc(this.center.x+ pos.x,this.center.y + pos.y,this.thickness,0,Math.PI*2, false);
			this.parent.graphics.fill();
			angle2 += this.increment2;
		}
		
		if (this.displayText) {
			this.parent.graphics.ctx.textAlign = "center";
			this.parent.graphics.ctx.font = "56px Verdana";
			var perc = Math.round(this.msg * 100);
			this.parent.graphics.ctx.fillText(perc,this.center.x,this.center.y + 16);
		}
	}
})();