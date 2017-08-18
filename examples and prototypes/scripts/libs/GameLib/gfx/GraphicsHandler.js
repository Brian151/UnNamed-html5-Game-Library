var GraphicsHandler = function(canvas) {
	this.ctx = canvas.getContext("2d");
	//this.preRenderingCanvas = null;
	//document.innerHTML += "<canvas id=\"screenP\" width=\"" + 600 + "\" height=\"" + 400 + "\"></canvas>";
	this.preRenderingCanvas = document.getElementById("screenP");
	this.pR = this.preRenderingCanvas.getContext("2d");
	//this.preRenderingCanvas.setAttribute("display","none");
	//a disgrace, this object needs to start pulling its own weight
	//Perhaps the next tech demo will focus on this!
	
	//MAJOR CLEAN-UP GENERALLY REQUIRED
	this.preRenderZone = document.getElementById("dynamicPre");
}
//empty method, subject for removal
GraphicsHandler.prototype.draw = function() {}
this.preRenderPattern = function(src,w,h) {
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
	}
GraphicsHandler.prototype.drawPattern = function (src,x,y,w,h,notFixed,preRendered) {
	//console.log("PATTERN!");
	var img = src;
	if(notFixed){
		if(!preRendered){
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
}
GraphicsHandler.prototype.drawClippedImage = function(img,x,y,w,h,ix,iy,iw,ih){
	if(!iw){
		this.ctx.drawImage(img,ix,iy,w,h,x,y,w,h);
	} else {
		this.ctx.drawImage(img,ix,iy,iw,ih,x,y,w,h);
	}
	//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	//context.drawImage(img,ix,iy,w,h,x,y,w,h); //refs
}
// impl ---> GraphicsUtils.getPalette
GraphicsHandler.prototype.getPalette = function(img,asImage) {
	var srcImg = img;
	this.preRenderZone.innerHTML += "<canvas id=\"tempPre\" width=\"" + srcImg.width + "\" height=\"" + srcImg.height + "\"></canvas>";
	var tempCanvas = document.getElementById("tempPre");
	var tempContext = tempCanvas.getContext("2d");
	tempContext.drawImage(srcImg,0,0);
	var imgData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
	var pal = [];
	for (var i=0; i < imgData.data.length; i += 4) {
		var red = imgData.data[i];
		var green = imgData.data[i + 1];
		var blue = imgData.data[i + 2];
		var alpha = imgData.data[i + 3];
		var match = false;
		for (var i2 = 0; i2 < pal.length; i2++) {
			var curr2 = pal[i2];
			if (curr2.r == red && curr2.g == green && curr2.b == blue && curr2.a == alpha) match = true;
		}
		if (!match) {
			var temp = {
				"r" : red,
				"g" : green,
				"b" : blue,
				"a" : alpha
			};
			pal.push(temp);
		}
	}
	tempContext = null;
	tempCanvas = null;
	this.preRenderZone.innerHTML = "";
	if(asImage) {
		var palImg = new ImageData(pal.length,1);
		for(var i = 0; i < pal.length; i++) {
			var pos = i * 4;
			var curr = pal[i];
			palImg.data[pos] = curr.r;
			palImg.data[pos + 1] = curr.g;
			palImg.data[pos + 2] = curr.b;
			palImg.data[pos + 3] = curr.a;
		}
		pal = this.imageDataToImage(palImg);
	}
	//tempContext.putImageData(imgData,0,0);
	//console.log(JSON.stringify(pal));
	return pal;
}
// impl ---> GraphicsUtils.showPalette
GraphicsHandler.prototype.drawPalette = function(pal,xScale,yScale,width) {
	var x = 0;
	var y = 0;
	var maxW = width * xScale;
	for (var i = 0; i < pal.length; i++) {
		var curr = pal[i];
		if (!(x % maxW) && x > 0) {
			x = 0;
			y += yScale;
		}
		var alpha = curr.a;
		if(alpha > 0) alpha = 255;
		this.ctx.fillStyle = "rgba(" + curr.r + "," + curr.g + "," + curr.b + "," + alpha + ")";
		this.ctx.fillRect(x,y,xScale,yScale);
		x += xScale;
	}
}
// impl --- > GraphicsUtils.imageToIndexedColor
GraphicsHandler.prototype.toIndexedColor = function(img) {
	var srcImg = img;
	this.preRenderZone.innerHTML += "<canvas id=\"tempPre\" width=\"" + srcImg.width + "\" height=\"" + srcImg.height + "\"></canvas>";
	var tempCanvas = document.getElementById("tempPre");
	var tempContext = tempCanvas.getContext("2d");
	tempContext.drawImage(srcImg,0,0);
	var imgData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
	var pal = [];
	var img2 = [];
	var w = srcImg.width;
	var h = srcImg.height;
	for (var i=0; i < imgData.data.length; i += 4) {
		//imgData.data[i] = 255;
		//imgData.data[i+1] = 0;
		//imgData.data[i+2] = 0;
		var red = imgData.data[i];
		var green = imgData.data[i + 1];
		var blue = imgData.data[i + 2];
		var alpha = imgData.data[i + 3];
		var match = false;
		for (var i2 = 0; i2 < pal.length; i2++) {
			var curr2 = pal[i2];
			if (curr2.r == red && curr2.g == green && curr2.b == blue && curr2.a == alpha) {
				match = true;
				img2.push(i2);
			}
		}
		if (!match) {
			var temp = {
				"r" : red,
				"g" : green,
				"b" : blue,
				"a" : alpha
			};
			img2.push(pal.length);
			pal.push(temp);
		}
	}
	tempContext = null;
	tempCanvas = null;
	var newImg = {};
	newImg.width = w;
	newImg.height = h;
	//newImg.pal = pal;
	newImg.data = img2;
	this.preRenderZone.innerHTML = "";
	//tempContext.putImageData(imgData,0,0);
	//console.log(JSON.stringify(newImg));
	return newImg;
}
// impl ---> GraphicsUtils.imageDataToImage
GraphicsHandler.prototype.imageDataToImage = function(imgD){
	var src = imgD;
	this.preRenderZone.innerHTML += "<canvas id=\"tempPre\" width=\"" + src.width + "\" height=\"" + src.height + "\"></canvas>";
	var tempCanvas = document.getElementById("tempPre");
	var tempContext = tempCanvas.getContext("2d");
	tempContext.putImageData(src,0,0);
	var dat = tempCanvas.toDataURL();
	var image2 = new Image(src.width,src.height);
	image2.src = dat;
	tempContext = null;
	tempCanvas = null;
	this.preRenderZone.innerHTML = "";
	return image2;
}
// impl --- > GraphicsUtils.applyPalette
GraphicsHandler.prototype.swapPalette = function(imgIndexed,pal,isImage) {
	var src = imgIndexed;
	if (isImage) src = this.toIndexedColor(src);
	this.preRenderZone.innerHTML += "<canvas id=\"tempPre\" width=\"" + src.width + "\" height=\"" + src.height + "\"></canvas>";
	var tempCanvas = document.getElementById("tempPre");
	var tempContext = tempCanvas.getContext("2d");
	var pal2 = pal;
	var imgData = new ImageData(src.width,src.height);
	var debugData = [];
	for (var i = 0; i < imgData.data.length; i += 4) {
		var col = pal2[0];
		var curr = src.data[(i / 4)];
		for (var i2 = 0; i2 < pal2.length; i2++) {
			if (i2 == curr) {
				col = pal2[curr];
				debugData.push(curr);
				break;
			}
		}
		imgData.data[i] = col.r;
		imgData.data[i + 1] = col.g;
		imgData.data[i + 2] = col.b;
		imgData.data[i + 3] = col.a;
	}
	//console.log(debugData.join(" , "));
	var intact = true;
	for (var i = 0; i < src.data; i++) {
		var curr2 = src.data[i];
		if (curr2 != debugData) {
			intact = false;
			break;
		}
	}
	console.log("pixel data is intact: " + intact);
	tempContext.putImageData(imgData,0,0);
	var dat = tempCanvas.toDataURL();
	var img2 = new Image(src.width,src.height);
	img2.src = dat;
	tempContext = null;
	tempCanvas = null;
	this.preRenderZone.innerHTML = "";
	return img2;
}