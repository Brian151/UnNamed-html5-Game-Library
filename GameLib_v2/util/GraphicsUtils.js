(function(){
"use strict";
//WIP!
var GraphicsUtils = stampit.stactics({
	imageToIndexedColor : function(img) {
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
	},
	applyPalette : function(imgIndexed,pal,isImage) {
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
	},
	showPalette : function(pal,xScale,yScale,width) {
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
	},
	getPalette : function(img,asImage) {
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
	},
	imageDataToImage : function(imgD) {
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
	},
	doImageEffects : function(img,img2,effectData) {
		var effects = effectData;
		var eff_gray = effects.grayscale;
		var eff_color = effects.colorize;
		var eff_colorP = effects.colorPal;
		var eff_opacity = effects.opacity;
		var srcImg = img;
		var overlayImg = img2;
		this.preRenderZone.innerHTML += "<canvas id=\"tempPre\" width=\"" + srcImg.width + "\" height=\"" + srcImg.height + "\"></canvas>";
		var tempCanvas = document.getElementById("tempPre");
		var tempContext = tempCanvas.getContext("2d");
		tempContext.drawImage(srcImg,0,0);
		var imgData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
		if (eff_gray) console.log("grayscale effect enabled!");
		if (eff_color) console.log("colorize effect enabled!");
		if (eff_color) console.log("color palette effect enabled!");
		if (eff_opacity) console.log("opacity effect enabled!");
		for (var i=0; i < imgData.data.length; i += 4) {
			if (eff_gray) {
				var brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
				imgData.data[i] = brightness + eff_gray.postBright;
				imgData.data[i + 1] = brightness + eff_gray.postBright;
				imgData.data[i + 2] = brightness + eff_gray.postBright;
			}
			if(eff_opacity) imgData.data[i + 3] *= eff_opacity;
			if (eff_color) {
				imgData.data[i] = colorMultiply(imgData.data[i],eff_color.r);
				imgData.data[i+1] = colorMultiply(imgData.data[i+1],eff_color.g);
				imgData.data[i+2] = colorMultiply(imgData.data[i+2],eff_color.b);
			}
			if(eff_colorP) {
				imgData.data[i] = eff_colorP.r;
				imgData.data[i+1] = eff_colorP.g;
				imgData.data[i+2] = eff_colorP.b;
			}
		}
		tempContext.putImageData(imgData,0,0);
		tempContext.drawImage(overlayImg,0,0);
		var newImg = new Image(srcImg.width,srcImg.height);
		newImg.src = tempCanvas.toDataURL();
		return newImg;
	}
});
QualityCatGameLibrary.attachModule(GraphicsUtils,"GraphicsUtil");})();