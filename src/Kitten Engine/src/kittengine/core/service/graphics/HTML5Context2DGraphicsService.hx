package kittengine.core.service.graphics;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Image;
import js.Browser.console;
import kittengine.core.service.graphics.EGraphicsCMDID;


// TODO : 
//		generic base class/interface
//		cull public functions
//		image/texture cache

// but for time reasons, this will have to do for now

class HTML5Context2DGraphicsService
{
	var target:CanvasRenderingContext2D;
	var data:Array<Float>;
	var commands:Array<EGraphicsCMDID>;
	var textures:Array<Image>;
	var fills:Array<String>;
	
	public function new() {
		data = new Array();
		commands = new Array();
		textures = new Array();
		fills = new Array();
	}
	
	// init function actually sets-up object 
	public function init(tgt:CanvasElement):Bool {
		var success:Bool = false;
		try {
			target = tgt.getContext2d();
			success = true;
		} catch (err:Dynamic) {
			// TODO	
			success = false;
		}
		return success;
	}
	
	public function rect(x:Int, y:Int, width:Int, height:Int) {
		target.rect(cast x, cast y, cast width, cast height);
	}
	
	public function ellipse(x:Int, y:Int, hradius:Int, vradius:Int) {
		target.ellipse(cast x, cast y, cast hradius, cast vradius, 0.0, 0.0, 0.0, false);
	}
	
	public function line(x:Int,y:Int)
	{
		target.lineTo(cast x, cast y);
	}
	
	public function quadCurve() {
		// TODO, CURVES ARE COMPLICATED
	}
	
	public function cubicCurve()
	{
		// TODO
	}
	
	// also needs work, thanks HTML5 canvas for being weird...
	public function setFillStyle(fs:String) {
		target.fillStyle = fs;
	}
	
	public function fill() {
		target.fill();
	}
	
	public function clearRect(x:Int, y:Int, width:Int, height:Int) {
		target.clearRect(cast x, cast y, cast width, cast height);
	}
	
	public function fillRect(x:Int, y:Int, width:Int, height:Int) {
		target.fillRect(cast x, cast y, cast width, cast height);
	}
	
	public function closePath() {
		target.closePath();
	}
	
	public function drawImage(x:Int, y:Int, img:Image) {
		target.drawImage(img, cast x, cast y);
	}
	
	public function render() {
		target.clearRect(0, 0, target.canvas.width, target.canvas.height);
		for (i in 0...commands.length) {
			var cmd : EGraphicsCMDID = commands.shift();
			switch (cmd) {
				case EGraphicsCMDID.NOP :
				case EGraphicsCMDID.MOVE_TO :
					target.moveTo(data.shift(),data.shift());
				case EGraphicsCMDID.LINE_TO :
					target.lineTo(data.shift(),data.shift());
				case EGraphicsCMDID.CURVE_TO :
					target.quadraticCurveTo(data.shift(),data.shift(),data.shift(),data.shift());
				case EGraphicsCMDID.WIDE_MOVE_TO :
					data.shift();
					data.shift();
					target.moveTo(data.shift(),data.shift());
				case EGraphicsCMDID.WIDE_LINE_TO :
					data.shift();
					data.shift();
					target.lineTo(data.shift(),data.shift());
				case EGraphicsCMDID.CUBIC_CURVE_TO :
					// TODO !
					data.shift();
					data.shift();
					data.shift();
					data.shift();
					data.shift();
					data.shift();
				case EGraphicsCMDID.PATH_START :
					target.beginPath();
				case EGraphicsCMDID.DRAW_IMAGE :
					target.drawImage(textures.shift(), data.shift(), data.shift());
				case EGraphicsCMDID.DRAW_CLIPPED_IMAGE :
					target.drawImage(textures.shift(), data.shift(), data.shift(), data.shift(), data.shift(), data.shift(), data.shift(), data.shift(), data.shift());
				case EGraphicsCMDID.FILL :
					target.fillStyle = fills.shift();
					target.fill();
			}
		}
	}
	
	// better name?
	// nicer params?
	public function appendRecords(cmds:Array<EGraphicsCMDID>,datas:Array<Float>) {
		for (i in 0...cmds.length) {
			commands.push(cmds.shift());
		}
		for (i in 0...datas.length) {
			data.push(datas.shift());
		}
	}
	
	public function appendTexture(tx:Image) {
		textures.push(tx);
	}
	
	public function appendFills(fill:String) {
		fills.push(fill);
	}
}