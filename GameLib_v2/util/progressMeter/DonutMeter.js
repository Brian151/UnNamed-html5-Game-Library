var DonutMeter = function(game,x,y,radius,thickness,colors) {
	ProgressMeter.call(this,game,x,y,colors);
	this.radius = radius;
	this.thickness = thickness;
}
DonutMeter.prototype = Object.create(ProgressMeter.prototype);
DonutMeter.constructor = DonutMeter;
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