package kittengine.core.api;
import kittengine.core.service.graphics.HTML5Context2DGraphicsService;
import js.html.CanvasRenderingContext2D;
import js.html.Image;
import js.Browser.console;
import kittengine.core.service.graphics.EGraphicsCMDID;

class BasicGraphicsAPI 
{
	public static var target:HTML5Context2DGraphicsService;
	
	public static function setTarget(tgt:HTML5Context2DGraphicsService) {
		target = tgt;
	}
	
	public static function rect(x:Int, y:Int, width:Int, height:Int) {
		target.appendRecords(
			[
				EGraphicsCMDID.PATH_START,
				EGraphicsCMDID.MOVE_TO,
				EGraphicsCMDID.LINE_TO,
				EGraphicsCMDID.LINE_TO,
				EGraphicsCMDID.LINE_TO,
				EGraphicsCMDID.LINE_TO
			],
			[
				x, y,
				x + width, y,
				x + width, y + height,
				x, y + height,
				x, y
			]
		);
	}
	
	public static function ellipse(x:Int, y:Int, hradius:Int, vradius:Int){
		// TODO!
	}
	
	// FUTURE : templates
	public static function polygon(x:Int, y:Int, sides:Int, radius:Int)
	{
		// TODO
	}
	
	public static function line(x:Int,y:Int)
	{
		target.appendRecords(
			[
				EGraphicsCMDID.LINE_TO
			],
			[
				x, y
			]
		);
	}
	
	public static function quadCurve(x:Int,y:Int,cx:Int,cy:Int) {
		// TODO, order?
	}
	
	public function cubicCurve()
	{
		// TODO!
	}
	
	// needs re-work, thanks HTML5 canvas for being weird...
	public static function setFillStyle(fs:String) {
		target.appendFills(fs);
	}
	
	public static function fill() {
		target.appendRecords(
			[
				EGraphicsCMDID.FILL
			], 
			[
			]
		);
	}
	
	// needed?
	public static function clearRect(x:Int, y:Int, width:Int, height:Int) {
		//target.clearRect(cast x, cast y, cast width, cast height);
	}
	
	// closePath() // not too useful? , complicates batch render process
	
	// needed?
	public static function fillRect(x:Int, y:Int, width:Int, height:Int) {
		rect(x, y, width, height);
		fill();
	}
	
	// re-implement!
	public static function drawImage(x:Int, y:Int, img:Image) {
		target.drawImage(cast x, cast y, img);
	}
	
	// TODO : implement clipped image in graphics service
	public static function drawClippedImage(img:Image,x:Int,y:Int,w:Int,h:Int,ix:Int,iy:Int,iw:Int,ih:Int) {
		if (iw == 0) {
			target.appendRecords(
				[
					EGraphicsCMDID.DRAW_CLIPPED_IMAGE
				],
				[
					cast ix, 
					cast iy, 
					cast w, 
					cast h, 
					cast x, 
					cast y, 
					cast w, 
					cast h
				]
			);
			target.appendTexture(img);
		} else {
			target.appendRecords(
				[
					EGraphicsCMDID.DRAW_CLIPPED_IMAGE
				], 
				[
					cast ix, 
					cast iy, 
					cast iw, 
					cast ih, 
					cast x, 
					cast y, 
					cast w, 
					cast h
				]
			);
			target.appendTexture(img);
		}
	}
}