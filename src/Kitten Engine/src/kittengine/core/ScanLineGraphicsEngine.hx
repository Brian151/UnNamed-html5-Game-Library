package kittengine.core;
import haxe.Constraints.Function;
import js.html.CanvasRenderingContext2D;
import js.html.ImageData;

/**
 * ...
 * @author Brian
 */
class ScanLineGraphicsEngine 
{
	public var width : Int;
	public var height : Int;
	var screen : CanvasRenderingContext2D;
	var buffer : ImageData;
	var isBlanked : Bool;
	public var bgColor : Array<Int>;
	var onHblank : Function;
	public var currLine:Int;
	
	public function new(target:CanvasRenderingContext2D) {
		currLine = 0;
		bgColor = [0, 0, 0];
		isBlanked = false;
		onHblank = function(e:ScanLineGraphicsEngine) {
			return false;
		}
		screen = target;
		width = target.canvas.width;
		height = target.canvas.height;
	}
	
	public function render() {
		for (pY in 0...height) {
			currLine = pY;
			if (onHblank(this)) {
				scan(true);
			} else {
				scan(false);
			}
		}
	}
	
	public function scan(forceBlank:Bool) {
		for (var pX in 0...width) {
			// unimplemented, util to make imagedatas not a pain...
			// setPixel(pX,currLine,this.bgColor);
			if (!forceBlank) {
				// TODO : implement tiles, sprites, layers...
				// proto code for reference :
				// known fix : iterate sprite array backwards
				// last defined sprite will ALWAYS be on-top,
				// so not even trying to render previous sprites speeds
				// this considerably...
				// this is probably a fairly expensive rendering engine to run,
				// so removing any steps it doesn't need to take is
				// crucial to having acceptable performance
				/*for (var s=0; s < sprites.length; s++) {
					var c = sprites[s];
					var maxX = (c.x + c.width) - 1;
					var maxY = (c.y + c.height) - 1;
					if (c.x <= pX && pX <= maxX) {
						var spX = pX - c.x;
						var spY = line - c.y;
					if (!(pX % 10)) {
						// console.log(s,spX,spY);
					}
					if (c.y <= line && line <= maxY) {
						var color = getPixel(c.idat,spX,spY);
						if (color[3] == 255) {
						setPixel(this.buffer,pX,line,color);
					}
				}
			}
			
		} */
			}
		}
	}
	
	public function addEventListener(name:String, callback:Function) {
		if (name == "horizontalblank") {
			onHblank = callback;
		} else {
			throw "Invalid event  : " + name + " for ScanLineGraphics object, cannot add event listener!";
		}
	}
	
	public function removeEventListener(name:String) {
		if (name == "horizontalblank") {
			onHblank = function(e:ScanLineGraphicsEngine) {
				return false;
			}
		}
	}
}