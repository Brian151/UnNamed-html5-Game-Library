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

	// TODO : re-define and sub-class to BitmapGraphicsEngine
	// graphics engine currently is tied to specific rendering backends
	// ideally should be more flexible where the game interfaces with a proxy,
	// which then further interacts with a specific rendering 'plugin'
	// this could be difficult to optimize for when dealing with webGL, however...
	// it also creates some layer code problems...
	// for the sake of being a bit more flexible, though, this should be acceptable
	// there are places where this engine will add 2-3 layers so as to avoid
	// developers being forced into writing code in a specific way to appease
	// the constrained manner in which the engine operates. The idea is that the engine
	// is merely there to assist, not dictate the exact structure and flow of the game
	// and its development process. That is why i am not exactly comfortable in calling it
	// an "engine", because it's intended to behave strictly like a library. 
	// Out of the box, it won't build a game, developers are expected to do that!
	
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