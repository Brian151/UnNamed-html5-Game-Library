package kittengine.objects.sprites;
import js.Browser;
import js.html.Image; // make this not use HTML image...
import kittengine.objects.GameObject;
import kittengine.core.api.BasicGraphicsAPI;

/**
 * ...
 * @author Brian
 */
 
class SimpleSprite extends GameObject 
{
	
	public var texture:Image;
	var minFrame:Int = 0;
	var maxFrame:Int;
	var rows:Int;
	var cols:Int;
	var width:Int;
	var height:Int;
	var frameWidth:Int;
	var frameHeight:Int;
	
	public function new(img:Image,frameW,frameH) 
	{
		super();
		texture = img;
		cols = Math.floor(texture.width / frameW);
		rows = Math.floor(texture.height / frameH);
		width = (cols * frameW);
		height = (rows * frameH);
		frameWidth = frameW;
		frameHeight = frameH;
		maxFrame =  (cols * rows) - 1;
	}
	
	// getting type complaints here... so, new function
	// TODO : fix this!
	public function drawFrame(frame,posX,posY) 
	{
		if (frame >= minFrame && frame < maxFrame) {
			var x : Int = (frame % cols) * frameWidth;
			var y : Int = Math.floor(frame / cols) * frameHeight;
			
			BasicGraphicsAPI.drawClippedImage(texture, posX, posY, frameWidth, frameHeight, x, y, 0, 0);
		}
	}
}