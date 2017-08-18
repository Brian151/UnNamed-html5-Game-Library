(function(){
"use strict";
var SpriteSheet = stampit.props({
	x : 0,
	y : 0,
	frameWidth : 0,
	frameHeight : 0,
	length : 0,
	timing : 0,
	timingMode : 1
}).deepProps({
	frames : [],
	labels : [],
	timings : []
}).methods({
	create : function(configData) {
		//copy template attributes to the new SpriteData object
		this.width = configData.width;
		this.height = configData.height;
		this.x = configData.x;
		this.y = configData.y;
		this.frameWidth = configData.sW;
		this.frameHeight = configData.sH;
		this.labels = configData.labels;
		this.length = configData.length;
		this.timings = configData.timings;
		this.timing = configData.timing;
		this.timingMode = configData.timingMode;
		var excludedFrames = configData.cutFrames;
		
		var i3 = 0; //id/index of the current frame
		//loop the various 'rows' of the sheet
		for (var i = 0; i < this.height; i += this.frameHeight) {
			//loop the various 'columns'/'cells' of the sheet
			for (var i2 = 0; i2 < this.width; i2 += this.frameWidth) {
				if (i2 + this.frameHeight <= this.width) {
					var copyFrame = true; //by default, we assume the current frame should be copied
					//loop the excluded frames array
					for(var i4=0; i4 < excludedFrames.length; i4++) {
						var curr = excludedFrames[i4];
						//the currrent frame is the same as an excluded frame, do not copy it
						if (curr == i3) {
							copyFrame = false;
							//console.log("do not copy frame! (" + curr + ")");
							excludedFrames.splice(i4,1); //no longer need this exclusion index
							break;
						}
					}
					//we are supposed to copy this frame, so lets copy it
					if (copyFrame) 
						this.frames.push({
							"x":this.x + i2,
							"y":this.y + i,
							"w":this.frameWidth,
							"h":this.frameHeight
							});
					i3++; //increment the frame counter
				} else {
					break;
				}
			}
			if (i + this.frameHeight <= this.height) {
				//nothing needs happen
			} else {
				break;
			}
		}
		//console.log(JSON.stringify(this.frames));
	}
});
QualityCatGameLibrary.attachModule(SpriteSheet,"SpriteSheet");})();