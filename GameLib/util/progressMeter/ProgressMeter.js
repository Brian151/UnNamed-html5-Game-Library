var ProgressMeter = function(game,x,y,colors) {
	this.parent = game;
	this.center = {x:x,y:y};
	this.msg = 0;
	this.colorBG = colors.c1 || "#000000";
	this.colorFG = colors.c2 || "#0077ff";
	this.colorBorder = colors.c3 || "#333333";
}
ProgressMeter.prototype.syncTo = function(target,progress,complete) {
	this.sycned = true;
	this.target = target;
	this.stats = [progress,complete];
}
ProgressMeter.prototype.tick = function() {
	if (this.sycned) {
		this.totalProgress = (this.target[this.stats[0]] / this.target[this.stats[1]]);
		if(this.totalProgress > 1) this.totalProgress = 1;
		this.msg = this.totalProgress;
	}
}
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