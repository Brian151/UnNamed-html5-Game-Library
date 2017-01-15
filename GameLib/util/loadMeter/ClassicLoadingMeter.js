var ClassicLoaderBar = function(game,x,y,width,height,colors) {
	PreloadScreen.call(this,game,x,y,colors);
	this.width = width;
	this.height = height;
	this.width2 = Math.floor(this.width / 2);
	this.height2 = Math.floor(this.height / 2);
}
ClassicLoaderBar.prototype = Object.create(PreloadScreen.prototype);
ClassicLoaderBar.constructor = ClassicLoaderBar;
ClassicLoaderBar.prototype.draw = function() {
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