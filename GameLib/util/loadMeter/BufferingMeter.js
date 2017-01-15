var BufferingScreen = function(game,x,y,radius,thickness,colors,config) {
	PreloadScreen.call(this,game,x,y,colors);
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
BufferingScreen.prototype = Object.create(PreloadScreen.prototype);
BufferingScreen.constructor = ClassicLoaderBar;
BufferingScreen.prototype.tick = function() {
	this.angle = MathUtils.clampAngle(this.angle += this.increment);
}
BufferingScreen.prototype.draw = function() {
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