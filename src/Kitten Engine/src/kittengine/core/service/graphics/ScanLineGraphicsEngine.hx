package kittengine.core.service.graphics;
import haxe.Constraints.Function;
import js.html.CanvasRenderingContext2D;
import js.html.ImageData;

enum EPixelFormat {
	// indexed modes
	BPP_1;
	BPP_2; 
	BPP_4;
	BPP_8;
}

enum EColorFormat {
	RGB8; // 3,3,2
	RGB16; // 0,5,5,5
	RGB24; // 8,8,8 , only one not needing to be coverted for display
}

typedef TTileFormat = {
	pixelFormat : EPixelFormat,
	tileWidth : Int,
	tileHeight : Int
}

// roughly copying NEO-GEO here
// see https://wiki.neogeodev.org/index.php?title=Sprites#Sprite_control_blocks
typedef TColumnSprite = { 
	x : Int,
	y : Int,
	// in pixels, real hardware does shrinking as well,
	// but this will be dealt with later [or not at all] 
	// as it could get complicated and slow things down very quickly
	height : Int, 
	sticky : Bool,
	// every 2 array entries is id,palette
	// in truth, the per-tile color palette selection
	// for column sprites may be axed if deemed non-beneficial
	// and/or harmful. it probably is...
	tiles : Array<Int>
}

// the more common format expected on most consoles/handhelds
// also typically used by so-called "fantasy consoles"
typedef TGridSprite = { 
	x : Int,
	y : Int,
	width : Int, // in tiles
	height : Int,
	// not nearly as many palettes/colors are available
	palette : Int, // every entry is ID
	tiles : Array<Int>
}

//	TODO
//		these definitions are not as solid as they need to be
//		to achieve the maximum performance they possibly can,
//		tiled graphics renderers need to be playing with
//		typed arrays, so some standard format and a decently fast way
//		of reading/writing it must be implemented
//		if the format is solid enough, a WebGL backend should be fairly straightforward



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
	public var palettes : Array<Int>;
	public var paletteCount : 16;
	public var paletteColorCount : 16;
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