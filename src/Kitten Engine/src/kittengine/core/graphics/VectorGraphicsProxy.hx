package kittengine.core.graphics;
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

enum EVectorCMDID {
	move;
	line;
	curve;
	rect;
	circle;
	ellipse;
}

typedef TVectorCMD {
	id : EVectorCMDID,
	x : Int,
	y : Int,
	cx : Int,
	cy : Int
}

typedef TLineStyle {
	thickness : Int,
	color : Array<Int>
}
 
class VectorGraphicsProxy 
{
	var fillColor:Array = [0, 0, 0, 255];
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
	
	public function line(x:Int,y:Int) {
		
	}
	
	public function curve(x:Int,y:Int,cx:Int,cy:Int) {
		
	}
	
	public function drawRoundRect() {
		
	}
	
	public function endFill() {
		
	}
	
}