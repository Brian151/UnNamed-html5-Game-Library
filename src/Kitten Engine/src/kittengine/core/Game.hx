package kittengine.core;
import js.Browser;
import js.Browser.window;
import js.html.CanvasElement;
import kittengine.core.service.graphics.HTML5Context2DGraphicsService;
import kittengine.objects.GameObject;
import kittengine.core.api.BasicGraphicsAPI;
import js.Browser.document;
import kittengine.core.service.InputManager;

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
	var services:Array<Dynamic>; // define these... T-T
	var apis:Array<Dynamic>;
	public var gameObjects:Array<GameObject>;
	public var staticGameObjects:Array<GameObject>;
	public var mainGraphicsService:HTML5Context2DGraphicsService;
	public var mainInputService:InputManager;
	
	public function new() {
		// handle later...
		// this should be done elsewhere, but for now...
		var canvas:CanvasElement = cast document.getElementById("thescreen");
		mainGraphicsService = new HTML5Context2DGraphicsService();
		mainGraphicsService.init(canvas);
		mainInputService = new InputManager(canvas);
		BasicGraphicsAPI.setTarget(mainGraphicsService);
		gameObjects = new Array();
		staticGameObjects = new Array();
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
		for (i in 0...gameObjects.length) {
			gameObjects[i].tick();
		}
	}
	
	public dynamic function draw() {
		// probably should do something else here as well
		for (i in 0...gameObjects.length) {
			gameObjects[i].draw();
		}
		mainGraphicsService.render();
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