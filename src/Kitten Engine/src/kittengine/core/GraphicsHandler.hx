package kittengine.core;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.ImageElement;
import js.html.ImageData;

/**
 * ...
 * @author Brian
 */
class GraphicsHandler 
{
	public var ctx:CanvasRenderingContext2D;
	public var canvas:CanvasElement;

	public function new(tgt:CanvasElement) {
		ctx = tgt.getContext2d();
		canvas = tgt;
		// TODO : PRE-RENDERING SHIZZ
	}
	
	public function drawClippedImage(img:ImageElement,x:Int,y:Int,w:Int,h:Int,ix:Int,iy:Int,iw:Int,ih:Int) {
		// there's no reason to set them to zero, so this will work
		if (iw == 0 || iy == 0) { 
			ctx.drawImage(img,ix,iy,w,h,x,y,w,h);
		} else {
			ctx.drawImage(img,ix,iy,iw,ih,x,y,w,h);
		}
	}
	
	// TODO : VECTOR OPERATIONS
	
	public function drawImage(img:ImageElement, x:Int, y:Int) {
		ctx.drawImage(img, x, y);
	}
	
	/*public function createImageData(x:Int, y:Int) {
		
	}*/
	
	public function getImageData(x:Int, y:Int, w:Int, h:Int):ImageData {
		return ctx.getImageData(x, y, w, h);
	}
	
	public function fillRect(x:Int, y:Int, width:Int, height:Int) {
		ctx.fillRect(x, y, width, height);
	}
}