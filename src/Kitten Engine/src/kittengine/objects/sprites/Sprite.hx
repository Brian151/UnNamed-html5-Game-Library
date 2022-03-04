package kittengine.objects.sprites;
import js.html.Image; // make this not use HTML image...
import kittengine.objects.GameObject;

/**
 * ...
 * @author Brian
 */

class SimpleSprite extends GameObject 
{
	var texture:Image;
	var minFrame:Int = 0;
	var width:Int;
	var height:Int;
	var frameWidth:Int;
	var frameHeight:Int;
	var rows:Int;
	var cols:Int;
	var maxFrame:Int;
	var timeNow:Date;
	var timeLast:Date;
	var deltaTime:Int;
	var currFrame:Int;
	
	public function new(img:Image,w:Int,h:Int,fW:Int,fH:Int) 
	{
		super();
		texture = img;
		rows = Math.floor(h / fH);
		cols = Math.floor(w / fW);
		width = (cols * fW);
		height = (rows * fH);
		maxFrame = (rows + cols) - 1;
		frameWidth = fW;
		frameHeight = fH;
	}
	
	public override function draw(frame) {
		var x = (frame % cols) * frameWidth;
		var y = (Math.floor(frame / cols)) * frameHeight;
	}
}