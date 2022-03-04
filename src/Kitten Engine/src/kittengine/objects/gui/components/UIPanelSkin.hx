package kittengine.objects.gui.components;
import kittengine.objects.gui.UIBaseComponent;
import kittengine.core.api.BasicGraphicsAPI;

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
		BasicGraphicsAPI.setFillStyle(color);
		// edge borders
		BasicGraphicsAPI.fillRect(20, 20 - sizeTop, width, sizeTop);
		BasicGraphicsAPI.fillRect(20, 20 + height, width, sizeBot);
		BasicGraphicsAPI.fillRect(20 - sizeLeft, 20, sizeLeft, height);
		BasicGraphicsAPI.fillRect(20 + width, 20, sizeRight, height);
		// corner borders
		BasicGraphicsAPI.fillRect(20 - sizeLeft, 20 - sizeTop, sizeLeft, sizeTop);
		BasicGraphicsAPI.fillRect(20 + width, 20 - sizeTop, sizeRight, sizeTop);
		BasicGraphicsAPI.fillRect(20 - sizeLeft, 20 + height, sizeLeft, sizeBot);
		BasicGraphicsAPI.fillRect(20 + width, 20 + height, sizeRight, sizeBot);
	}
	
}