//WIP!
var GraphicsUtils = new function(){}();
GraphicsUtils.extractPalette = function(image) {
	var out = {
		datatype : "palette",
		count : 0,
		colors : []
	}
	for (var i=0; i < image.height; i++) {
		for (var j=0; j < image.width; j++) {
			var currcolor = [
				image.data[(((i * image.width) + j) * 4)],
				image.data[(((i * image.width) + j) * 4) + 1],
				image.data[(((i * image.width) + j) * 4) + 2],
				image.data[(((i * image.width) + j) * 4) + 3]
			];
			var index = -1;
			for (var k=0; k < out.colors.length; k++) {
				var checkcolor = out.colors[k];
				if (currcolor[0] == checkcolor[0]) {
					if (currcolor[1] == checkcolor[1]) {
						if (currcolor[2] == checkcolor[2]) {
							if (currcolor[3] == checkcolor[3]) {
								index = k;
								break;
							}
						}
					}
				}
			}
			if (index < 0) {
				out.colors.push(currcolor);
				out.count++;
			}
		}
	}
	return out;
}
GraphicsUtils.convertImageToIndexed = function(image) {
	var out = {
		datatype : "indexed_image",
		width : image.width,
		height : image.height,
		data : [],
		palette : this.extractPalette(image)
	}
	for (var i=0; i < image.height; i++) {
		for (var j=0; j < image.width; j++) {
			var currcolor = [
				image.data[(((i * image.width) + j) * 4)],
				image.data[(((i * image.width) + j) * 4) + 1],
				image.data[(((i * image.width) + j) * 4) + 2],
				image.data[(((i * image.width) + j) * 4) + 3]
			];
			var index = 0;
			for (var k=0; k < out.palette.colors.length; k++) {
				var checkcolor = out.palette.colors[k];
				if (currcolor[0] == checkcolor[0]) {
					if (currcolor[1] == checkcolor[1]) {
						if (currcolor[2] == checkcolor[2]) {
							if (currcolor[3] == checkcolor[3]) {
								index = k;
								break;
							}
						}
					}
				}
			}
			out.data.push(index);
		}
	}
	return out;
}