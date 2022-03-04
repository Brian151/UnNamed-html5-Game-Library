package kittengine.objects.gui.components;
import kittengine.objects.gui.UIBaseComponent;
import kittengine.core.api.BasicGraphicsAPI;
import js.Browser.console;

/**
 * ...
 * @author Brian
 */
class UIPanelSkin extends UIBaseComponent
// TODO : add texture, probably re-name "Slice9Skin" or similar
{
	var sizeTop : Int;
	var sizeBot : Int;
	var sizeLeft : Int;
	var sizeRight : Int;

	public function new() 
	{
		super();
		color = "#ff80a0";
	}
	
	public function setBorders(top,left,right,bottom) {
		sizeTop = top;
		sizeLeft = left;
		sizeRight = right;
		sizeBot = bottom;
	}
	
	public override function draw() {
		
		/*var width = w;
	var height = h;
	var w1 = width - 1;
	var h1 = height - 1;
	var top = t;
	var right = r; 
	var bot = b;
	var left = l;
	var t1 = top - 1;
	var r1 = right - 1;
	var b1 = bot - 1;
	var l1 = left - 1;*/
	console.log(posX + " , " + posY);
	
		BasicGraphicsAPI.setFillStyle(color);
		// edge borders
		BasicGraphicsAPI.fillRect(posX, posY - sizeTop, width, sizeTop);
		BasicGraphicsAPI.fillRect(posX, posY + height, width, sizeBot);
		BasicGraphicsAPI.fillRect(posX - sizeLeft, posY, sizeLeft, height);
		BasicGraphicsAPI.fillRect(posX + width, posY, sizeRight, height);
		// corner borders
		BasicGraphicsAPI.fillRect(posX - sizeLeft, posY - sizeTop, sizeLeft, sizeTop);
		BasicGraphicsAPI.fillRect(posX + width, posY - sizeTop, sizeRight, sizeTop);
		BasicGraphicsAPI.fillRect(posX - sizeLeft, posY + height, sizeLeft, sizeBot);
		BasicGraphicsAPI.fillRect(posX + width, posY + height, sizeRight, sizeBot);
	}
	
}