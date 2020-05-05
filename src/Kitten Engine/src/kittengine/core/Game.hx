package kittengine.core;
import js.Browser;
import js.Browser.window;

/**
 * ...
 * @author Brian
 */
class Game 
{
	var timingTick:Int = 16; // approx 60 Updates Per Sec, can't go lower???
	var timingDraw:Int = 0;
	var deltaTick:Float = 0;
	var deltaDraw:Float = 0;
	var timeNow:Dynamic;
	var timeLast:Dynamic;
	
	public function new() {
		// handle later...
	}
	
	// due to a bug in this implementation or a javascript/haxe issue,
	// this doesn't seem to be able to run lower than 30-60 FPS/UPS
	public function setUPS(perSecond:Int) {
		if (perSecond > 0) {
			timingTick = Math.round(1000 / perSecond);
		} else {
			timingTick = Math.round(1000 / 30);
		}
	}
	
	public function setFPS(perSecond:Int) {
		if (perSecond > 0) {
			timingDraw = Math.round(1000 / perSecond);
		} else {
			timingDraw = 0;
		}
	}
	
	public dynamic function tick() {
		
	}
	
	public dynamic function draw() {
		
	}
	
	public function init() {
		// TODO
		timeNow = Date.now();
		timeLast = timeNow;
		Browser.console.log("HI THERE!");
	}
	
	public function run(num:Float):Void {
		timeNow = Date.now();
		deltaTick = (timeNow - timeLast) / timingTick;
		deltaDraw = (timeNow - timeLast) / timingDraw;
		
		// check timers
		if (deltaTick >= 1) {
			deltaTick--;
			tick();
		}
		if (deltaDraw >= 1) {
			deltaDraw--;
			draw();
		}
		
		timeLast = timeNow;
		Browser.window.requestAnimationFrame(run);
	}
	
}