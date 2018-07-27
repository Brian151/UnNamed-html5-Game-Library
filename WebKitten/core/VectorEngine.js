var VectorTool = new function() {
	this.ctx = null;
	this.hasContext = false;
	this.isFilling = false;
	this.isStroking = false;
}();
VectorTool.bindContext = function(ctx) {
	this.hasContext = true;
	this.ctx = ctx;
}
VectorTool.beginFill = function(color) {
	if (!this.hasContext) {
		//nope
	} else {
		if (this.isFilling)
			this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.fillStyle = color;
	}
}
/*WIP!!!
AS3 docs about flash graphics API:
http://help.adobe.com/en_US/ActionScript/3.0_ProgrammingAS3_Flex/WS5b3ccc516d4fbf351e63e3d118a9b90204-7dd9.html
*/