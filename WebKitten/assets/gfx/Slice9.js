var Slice9 = function(parent,x,y,w,h,sliceData){
	this.parent = parent;
	//console.log(img);
	if(sliceData.type == "image"){
		this.isImageSlice = true;
		this.img = GameObjs.assets.requestAsset(sliceData.img);
		this.createSliceRegions(this.img.width,this.img.height,{top:sliceData.skin.t,right:sliceData.skin.r,bottom:sliceData.skin.b,left:sliceData.skin.l});
	} else if (sliceData.type == "color") {
		this.color = sliceData.color;
		var tempW = sliceData.w;
		var tempH = sliceData.h;
		this.createSliceRegions(tempW,tempH,{top:sliceData.skin.t,right:sliceData.skin.r,bottom:sliceData.skin.b,left:sliceData.skin.l});
	}
	//this.parent.renderer.ctx.drawImage(this.img,0,0);
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	//this.color = "#cccccc";
	
	//console.log(JSON.stringify(sliceData.skin));
	//console.log(JSON.stringify(this.sliceData));
	//console.log(this.img.src);
	//console.log(this.x + " , " + this.y);
	//console.log(this.width + " X " + this.height);
	this.minW = this.sliceData.middle.minW;
	this.minH = this.sliceData.middle.minH;
}
Slice9.prototype.tick = function(){} //placeholder, subject for removal
Slice9.prototype.draw = function(){
	//var tcol = this.parent.renderer.ctx.fillStyle;
	//this.parent.renderer.ctx.fillStyle = this.color;
	//this.parent.renderer.ctx.fillRect(this.x-3,this.y,this.width+6,this.height);
	//this.parent.renderer.ctx.fillStyle = tcol;
	if(this.isImageSlice){
		var tl = this.sliceData.topLeft;
		var t = this.sliceData.top;
		var tr = this.sliceData.topRight;
		var r = this.sliceData.right;
		var br = this.sliceData.bottomRight;
		var b = this.sliceData.bottom;
		var bl = this.sliceData.bottomLeft;
		var l = this.sliceData.left;
		GameObjs.renderer.drawClippedImage(this.img,this.x - tl.width,this.y - tl.height,tl.width,tl.height,tl.x,tl.y);
		//this.drawClippedImage = function(img,x,y,w,h,ix,iy)
		GameObjs.renderer.drawClippedImage(this.img,this.x,this.y - t.height,this.width,t.height,t.x,t.y,t.width,t.height);
		GameObjs.renderer.drawClippedImage(this.img,this.x + this.width,this.y - tr.height,tr.width,tr.height,tr.x,tr.y);
		GameObjs.renderer.drawClippedImage(this.img,this.x - l.width,this.y,tl.width,this.height,l.x,l.y,l.width,l.height);
		GameObjs.renderer.drawClippedImage(this.img,this.x + this.width,this.y,r.width,this.height,r.x,r.y,r.width,r.height);
		GameObjs.renderer.drawClippedImage(this.img,this.x - bl.width,this.y + this.height,bl.width,bl.height,bl.x,bl.y);
		GameObjs.renderer.drawClippedImage(this.img,this.x,this.y + this.height,this.width,b.height,b.x,b.y,b.width,b.height);
		GameObjs.renderer.drawClippedImage(this.img,this.x + this.width,this.y + this.height,br.width,br.height,br.x,br.y);
	} else {
		var tempCol = GameObjs.renderer.ctx.fillStyle;
		GameObjs.renderer.ctx.fillStyle = this.color;
		var tl = this.sliceData.topLeft;
		var t = this.sliceData.top;
		var tr = this.sliceData.topRight;
		var r = this.sliceData.right;
		var br = this.sliceData.bottomRight;
		var b = this.sliceData.bottom;
		var bl = this.sliceData.bottomLeft;
		var l = this.sliceData.left;
		GameObjs.renderer.ctx.fillRect(this.x - tl.width,this.y - tl.height,tl.width,tl.height);
		GameObjs.renderer.ctx.fillRect(this.x,this.y - t.height,this.width,t.height);
		GameObjs.renderer.ctx.fillRect(this.x + this.width,this.y - tr.height,tr.width,tr.height);
		GameObjs.renderer.ctx.fillRect(this.x - l.width,this.y,tl.width,this.height);
		GameObjs.renderer.ctx.fillRect(this.x + this.width,this.y,r.width,this.height);
		GameObjs.renderer.ctx.fillRect(this.x - bl.width,this.y + this.height,bl.width,bl.height);
		GameObjs.renderer.ctx.fillRect(this.x,this.y + this.height,this.width,b.height);
		GameObjs.renderer.ctx.fillRect(this.x + this.width,this.y + this.height,br.width,br.height);
		GameObjs.renderer.ctx.fillStyle = tempCol;
	}
}
Slice9.prototype.createSliceRegions = function(width,height,margins) {
	var w1 = width - 1;
	var h1 = height - 1;
	var top = margins.top;
	var right = margins.right;
	var bottom = margins.bottom;
	var left = margins.left;
	var t1 = top - 1;
	var r1 = right - 1;
	var b1 = bottom - 1;
	var l1 = left -1;
	var slices = {};
	slices["topLeft"] = new SliceRegion(0,0,left,top,true,true);
	slices["topRight"] = new SliceRegion(w1 - r1,0,right,top,true,true);
	slices["bottomRight"] = new SliceRegion(w1 - r1,h1 - b1,right,bottom,true,true);
	slices["bottomLeft"] = new SliceRegion(0,h1 - b1,left,bottom,true,true);
	var sW = (w1 - right) - l1;
	slices["top"] = new SliceRegion(left,0,sW,top,false,true);
	slices["bottom"] = new SliceRegion(left,h1 - b1,sW,bottom,false,true);
	var sH = (h1 - bottom) - t1;
	slices["left"] = new SliceRegion(0,top,left,sH,true,false);
	slices["right"] = new SliceRegion(w1 - r1,top,right,sH,true,false);
	slices["middle"] = new SliceRegion(left,top,sW,sH,false,false);
	this.sliceData = slices;
}
var SliceRegion = function(x,y,width,height,lockWidth,lockHeight) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.lockW = lockWidth;
	this.lockH = lockHeight;
}