var Sprite = function(x,y,img,animationData) {
	this.spriteSheetImage = img;
	this.animationData = animationData;
	this.x = x;
	this.y = y;
	this.currFrame = 0;
	this.currLabel = this.animationData.labels[0].name;
	this.stopped = false;
	this.constrained = false;
	this.timer = 0;
	this.timing = this.animationData.timing;
}
Sprite.prototype.tick = function() {
	//this.findCurrentLabel();
	if(!(this.timer % this.timing) && this.timer != 0) {
		this.currFrame++;
		if (this.currFrame == this.animationData.length) this.currFrame = 0;
		this.timer = 0;
		//console.log(this.currFrame);
	}
	this.timer++;
}
Sprite.prototype.findCurrentLabel = function() {
	for(var i=0; i < this.animationData.labels; i++) {
		var curr = this.animationData.labels[i];
		if(curr.i <= this.currFrame) {
			this.currLabel = curr.name;
			console.log(curr.name);
			this.timing = this.animationData.timings[this.currLabel];
		}
	}
}
Sprite.prototype.draw = function(){
	//console.log("draw!");
	this.tick();
	var frame = this.animationData.frames[this.currFrame];
	GameObjs.renderer.drawClippedImage(this.spriteSheetImage,this.x,this.y,this.animationData.frameWidth,this.animationData.frameHeight,frame.x,frame.y);
}
Sprite.prototype.gotoAndStop = function(frame) {

}
Sprite.prototype.gotoAndPlay = function(frame) {

}
/*specifically since I don't want work with nested animations just yet,
and also because the Sprite object uses spritesheets, raising
some questions how this implementation should work exactly*/
Sprite.prototype.gotoAndPlayWithin = function(frame) {

}