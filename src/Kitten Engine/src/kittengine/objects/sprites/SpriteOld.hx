package kittengine.objects.sprites;

import haxe.DynamicAccess;
import js.html.Image;
import kittengine.objects.GameObject;
import unsorted.SpriteIter;

/**
 * ...
 * @author Brian
 */

 typedef TSpriteFrame = {
	x : Int,
	y : Int,
	width : Int,
	height : Int
 }
 
 typedef TSpriteSheetLabel = {
	name : String,
	i : Int,
	e : Int
 }
 
 typedef TSpriteSheetTimingConfig = {
	
 }
 
 typedef TSpriteSheet = {
	x:Int,
	y:Int,
	width:Int,
	height:Int,
	sW:Int,
	sH:Int,
	cutFrames:Array<Int>,
	labels:Array<TSpriteSheetLabel>,
	length:Int,
	timings:Dynamic,
	timing:Int,
	timingMode:Int
 }
 
 typedef TSpriteState = {
	stopped : Bool,
	currFrame : Int,
	currLabel : String,
	x : Int,
	y : Int
 }
 
class Sprite extends GameObject 
{
	
	public var texture:Image;
	var labels:Array<String>;
	var length:Int;
	var timings:DynamicAccess<Dynamic>;
	var timing:Int;
	var timingMode:Int;
	var frames:Array<TSpriteFrame>;
	var state:TSpriteState;
	// TODO : instances
	var minFrame:Int = 0;
	var maxFrame:Int;
	
	public function new(cfg:TSpriteSheet,img:Image) 
	{
		super();
		fromSpriteSheet(cfg);
		texture = img;
		state = {
			stopped : false,
			currFrame : 0,
			currLabel : "",
			x : 0,
			y : 0
		}
		maxFrame = frames.length - 1;
	}
	
	public function fromSpriteSheet(cfg:TSpriteSheet) {
		var frameWidth:Int = cfg.sW;
		var frameHeight:Int = cfg.sH;
		var x:Int = cfg.x;
		var y:Int = cfg.y;
		var width = cfg.width;
		var height = cfg.height;
		var ic = 0;
		var frames = new Array();
		for (var iy:Int in new SpriteIter(0,height,frameHeight)) {
			for (var ix:Int in new SpriteIter(0,width,frameWidth)) {
				var copyFrame:Bool = true;
				for (cf in 0...cfg.cutFrames.length) {
					var f = cfg.cutFrames[cf];
					if (f == ic) {
						copyFrame = false;
						cfg.cutFrames.splice(cf, 1);
						break;
					}
				}
				if (copyFrame) {
					frames.push({
						x : x + ix,
						y : y + iy,
						width : frameWidth,
						height : frameHeight
					});
				}
			}
		}
	}
	
	public function tick() {
		if (!state.stpped) {
			// ignore timing modes for now, blek
			this.timeNow = Date.now();
				this.deltaTime += (this.timeNow - this.timeLast) / this.rate;
				this.timeLast = this.timeNow;
				if (this.deltaTime >= 1) {
					this.deltaTime = 0;
					this.currFrame++;
					if (this.currFrame == (this.frameMax + 1)) this.currFrame = this.frameMin;
				//console.log(this.deltaTime);
				}
			
		}
	}
	
}