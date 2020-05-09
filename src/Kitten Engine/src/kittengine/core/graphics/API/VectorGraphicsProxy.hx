package kittengine.core.graphics.API;
import js.html.Image;

/**
 * ...
 * @author Brian
 */

enum EFillType {
	color;
	image;
	gradient;
}

// as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsPathCommand.html
enum EVectorCMDID {
	NOP;
	MOVE_TO;
	LINE_TO;
	CURVE_TO;
	// may just skip these
	WIDE_MOVE_TO;
	WIDE_LINE_TO;
	// need to implement, HTML5 only has quad curve
	CUBIC_CURVE_TO;
}

// may not do it this way, but needed to ID the graphics data entries
// rather not create classes/interfaces for this
enum EVectorGraphicsRecord {
	SOLIDFILL;
	BITMAPFILL;
	GRADIENTFILL;
	STROKE;
	PATH;
	ENDFILL;
}

// as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsPath.html
// omitted winding cuz screw that garbage!
typedef TVectorPath = {
	commands : Array<Int>,
	data : Array<Int>
}

//as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsSolidFill.html
typedef VectorSolidFill = {
	color : Array<Int>, // if possible, should be Int
	alpha : Int
}

//as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsBitmapFill.html
typedef TVectorBitmapFill = {
	bitmapData : Image , // for now...
	matrix : Int, // gotta implement >.<
	repeat : Bool,
	smooth : Bool
}

// GraphicsEndFill

//as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsGradientFill.html
typedef TVectorGradientFill = {
	colors : Array<Int>,
	alphas : Array<Int>,
	ratios : Array<Int>
	matrix : Int, // again, gotta implement this
	focalPointRatio : Float,
	// could probably use enumerator, instead
	interPolationMethod : String,
	spreadMethod : String,
	type : String
}

// as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsStroke.html
typedef TVectorGraphicsStroke = {
	thickness : Int,
	fill : Int, // gotta do some things...
	// pixelHinting : Bool, // might omit
	miterLimit : Float,
	// could probably use enumerator, instead
	joints : String,
	scaleMode : String,
	caps : String,
}


// need better naming convention for stuff!
class VectorGraphicsProxy 
{
	var fillColor:Array<Int> = [0, 0, 0, 255];
	var fillType:EFillType;
	var lineStyle:TLineStyle = {
		thickness : 1,
		color : [0,0,0,255]
	}
	var fillImage:Image;
	var fillGradient : Dynamic; // for now...
	var path : Array<TVectorCMD>
	
	
	public function new() 
	{
		// https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/Graphics.html
		path = new Array<TVectorCMD>();
		fillType = EFillType.color;
		// need to work on intitializer
	}
	
	public function beginFill(color:Array) {
		fillColor = [color[0], color[1], color[2], color[3]];
	}
	
	// all TODO
	public function beginBitmapFill() {
		
	}
	
	public function beginGradientFill() {
		
	}
	
	public function drawPath() {
		
	}
	
	public function ellipse(x:Int,y:Int,width:Int,height:Int) {
		
	}
	
	public function circle(x:Int,y:Int,radius:Int) {
		ellipse(0,0,0,0);
	}
	
	public function lineTo(x:Int,y:Int) {
		
	}
	
	public function quadraticCurveTo(x:Int,y:Int,cx:Int,cy:Int) {
		
	} // how feasible is cubic curve???
	
	public function drawRoundRect(x:Int,y:Int,width:Int,height:Int,ellipseWidth:Int,ellipseHeight:Int) {
		
	}
	
	public function drawRect(x:Int, y:Int, width:Int, Height:Int) {
		
	}
	
	public function endFill() {
		
	}
	
	
}