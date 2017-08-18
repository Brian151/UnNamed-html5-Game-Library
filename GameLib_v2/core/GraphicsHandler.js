(function(){
"use strict";
var GraphicsHandler = stampit.deepProps({
	ctx : {},
	preRenderingCanvas : {},
	pR : {}
}).methods({
	attach : function(canvas) {
		this.ctx = canvas.getContext("2d");
		this.preRenderingCanvas = document.getElementById("screenP");
		this.pR = this.preRenderingCanvas.getContext("2d");
	},
	preRenderPattern : function(src,w,h) {
		console.log("pre-render pattern!");
		var pat = this.pR.createPattern(src,"repeat");
		var pw = this.pR.canvas.width;
		var ph =  this.pR.canvas.height;
		this.pR.fillStyle = pat;
		this.pR.fillRect(0,0,pw,ph);
		var wt = Math.round(w);
		var ht = Math.round(h);
		var imgPat = this.pR.getImageData(0,0,wt,ht);
		return imgPat;
	},
	drawPattern : function(src,x,y,w,h,notFixed,preRendered) {
		var img = src;
		if (notFixed) {
			if (!preRendered) {
			var pat = this.pR.createPattern(img,"repeat");
			this.pR.fillStyle = pat;
			var pw = this.pR.canvas.width;
			var ph =  this.pR.canvas.height;
			this.pR.fillRect(0,0,pw,ph);
			this.imgD = this.pR.getImageData(0,0,w,h);
			this.ctx.putImageData(this.imgD,x,y);
			} else {
				this.ctx.putImageData(img,x,y);
			}
		} else {
			var fillBackup = this.ctx.fillStyle;
			var pat = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pat;
			this.ctx.fillRect(x,y,w,h);
			this.ctx.fillStyle = fillBackup;
		}
	},
	drawClippedImage : function(img,x,y,w,h,ix,iy,iw,ih) {
		if(!iw){
			this.ctx.drawImage(img,ix,iy,w,h,x,y,w,h);
		} else {
			this.ctx.drawImage(img,ix,iy,iw,ih,x,y,w,h);
		}
		//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		//context.drawImage(img,ix,iy,w,h,x,y,w,h); //refs
	},
	//native draw call proxies (especially needed for vector engines)
	beginPath : function() {
		this.ctx.beginPath();
	},
	closePath : function() {
		this.ctx.closePath();
	},
	fill : function() {
		this.ctx.fill();
	},
	stroke : function() {
		this.ctx.stroke();
	},
	moveTo : function(x,y) {
		this.ctx.moveTo(x,y);
	},
	lineTo : function(x,y) {
		this.ctx.lineTo(x,y);
	},
	quadraticCurveTo : function(cx,cy,dx,dy) {
		this.ctx.quadraticCurveTo(cx,cy,dx,dy);
	},
	bezierCurveTo : function(cx1,cy1,cx2,cy2,dx,dy) {
		this.ctx.bezierCurveTo(cx1,cy1,cx2,cy2,dx,dy);
	},
	arc : function(x,y,r,a1,a2,cc) {
		this.ctx.arc(x,y,r,a1,a2,cc);
	},
	arcTo : function(x1,y1,x2,y2,r) {
		this.ctx.arcTo(x1,y1,x2,y2,r);
	},
	drawImage : function(img,x,y) {
		this.ctx.drawImage(img,x,y);
	},
	//also needs to create from source image data
	createImageData : function(w,h) {
		this.ctx.createImageData(w,h);
	},
	getImageData : function(x,y,w,h) {
		this.ctx.getImageData(x,y,w,h);
	},
	//more stuff to support...
	putImageData : function(iDat,x,y) {
		this.ctx.putImageData(iDat,x,y);
	},
	rect : function(x,y,w,h) {
		this.ctx.rect(x,y,w,h);
	},
	//add fill styles
	fillRect : function(x,y,w,h) {
		this.ctx.fillRect(x,y,w,h);
	},
	//add line styles
	strokeRect : function(x,y,w,h) {
		this.ctx.strokeRect(x,y,w,h);
	},
	clearRect : function(x,y,w,h) {
		this.ctx.clearRect(x,y,w,h);
	}
	//clearAll()
	//still WIP
	/* 
		future : 
		beginFill()
		endFill()
		conditional override of 'native' methods to push to queue or frame buffer
		(effectively, re-create parts (or all) of the Flash AS3 drawing API)
	*/
});
QualityCatGameLibrary.attachModule(GraphicsHandler,"Graphics");})();