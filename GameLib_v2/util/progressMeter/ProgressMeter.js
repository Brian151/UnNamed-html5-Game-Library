(function(){
/*
	VERY WIP!!!
	many things should be changed, especially about how these track progress, or
	bind to a rendering context...
*/
"use strict";
var ProgressMeter = stampit.props({
	msg : "0",
	colorBG : "#000000",
	colorFG : "#0077ff",
	colorBorder : "#333333",
	synced : false
}).methods({
	attachTo : function(game,x,y,colors) {
		this.parent = game;
		this.center = {x:x,y:y};
		if (typeof colors != "undefined") {
			if (typeof colors.c1 == "string")
				this.colorBG = colors.c1;
			if (typeof colors.c2 == "string")
				this.colorFG = colors.c2;
			if (typeof colors.c3 == "string")
				this.colorBorder = colors.c3;
		}
	},
	syncTo : function(target,progress,complete) {
		this.sycned = true;
		this.target = target;
		this.stats = [progress,complete];
	},
	tick : function() {
		if (this.sycned) {
			this.totalProgress = (this.target[this.stats[0]] / this.target[this.stats[1]]);
			if(this.totalProgress > 1) this.totalProgress = 1;
			this.msg = this.totalProgress;
		}
	},
	draw : function() {
		this.parent.graphics.ctx.fillStyle = this.colorFG;
		this.parent.graphics.ctx.strokeStyle = this.colorBorder;
		this.parent.graphics.ctx.lineWidth = 3;
		this.parent.graphics.ctx.textAlign = "center";
		this.parent.graphics.ctx.font = "64px Verdana";
		var perc = Math.round(this.msg * 100);
		this.parent.graphics.ctx.fillText(perc + " %",this.center.x,this.center.y);
		this.parent.graphics.ctx.strokeText(perc + " %",this.center.x,this.center.y);
	}
}).deepProps({
	center : {},
	target : {},
	stats : [],
	parent : {}
});
QualityCatGameLibrary.attachModule(ProgressMeter,"ProgressMeter");
var ClassicProgressBar = stampit.compose(ProgressMeter,{
	props : {
		width: 0,
		height : 0,
		width2 : 0,
		height2 : 0
	},
	methods : {
		setSize : function(width,height) {
			this.width = width;
			this.height = height;
			this.width2 = Math.floor(this.width / 2);
			this.height2 = Math.floor(this.height / 2);
		},
		draw : function() {
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
	}
});
QualityCatGameLibrary.attachModule(ClassicProgressBar,"ProgressBar");
var ProgressDonut = stampit.compose(ProgressMeter,{
	props : {
		radius : 0,
		thickness : 0
	},
	methods : {
		setSize: function(radius,thickness) {
			this.radius = radius;
			this.thickness = thickness;
		},
		draw : function() {
			this.parent.graphics.ctx.fillStyle = this.colorFG;
			var angleStart = QualityCatGameLibrary.Math.radians(270);
			var aTemp = Math.round(this.totalProgress * 360);
			var angle = QualityCatGameLibrary.Math.radians(270 + aTemp);
			this.parent.graphics.beginPath()
			this.parent.graphics.arc(this.center.x,this.center.y,this.radius + this.thickness,angleStart,angle, false); // outer (filled)
			this.parent.graphics.arc(this.center.x,this.center.y,this.radius,angle,angleStart, true); // outer (unfills it)
			this.parent.graphics.fill();
	
			this.parent.graphics.ctx.textAlign = "center";
			this.parent.graphics.ctx.font = "56px Verdana";
			var perc = Math.round(this.msg * 100);
			this.parent.graphics.ctx.fillText(perc,this.center.x,this.center.y + 16);
		}
	}
});
QualityCatGameLibrary.attachModule(ProgressDonut,"ProgressDonut");
var BufferingMeter = stampit.compose(ProgressMeter,{
	props : {
		radius : 0,
		thickness : 0,
		angle : 0
	},
	methods : {
		setSize : function(radius,thickness) {
			this.radius = radius;
			this.thickness = thickness;
			
			//set-up a default style for this later...
			this.totalChilds = 6;
			this.startAngle = QualityCatGameLibrary.Math.clampAngle(270 + (630/6));
			this.displayText = false;
			this.increment = 10;
			this.increment2 = QualityCatGameLibrary.Math.radians(360/6);
			this.angle = 0;
		},
		tick : function() {
			this.angle = QualityCatGameLibrary.Math.clampAngle(this.angle += this.increment);
		},
		draw : function() {
			this.parent.graphics.ctx.fillStyle = this.colorFG;
			var angle2 = QualityCatGameLibrary.Math.radians(QualityCatGameLibrary.Math.clampAngle(this.startAngle + this.angle));
			for (var i=0; i < this.totalChilds; i++) {
				var pos = QualityCatGameLibrary.Math.cartFromPolar(this.radius,angle2);
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
	}
});
QualityCatGameLibrary.attachModule(BufferingMeter,"ProgressThrobber");})();