package testing.demo1;
import js.Browser;
import js.html.CanvasElement;
import kittengine.core.Game;
import kittengine.core.GraphicsHandler;
import kittengine.core.InputManager;
import testing.demo1.obj.SquareBro;
import js.Browser.document;

enum EGameState {
	load;
	play;
}

/**
 * ...
 * @author Brian
 */
class Demo1 extends Game
{
	var d00dz:Array<SquareBro>;
	var canvas:CanvasElement;
	var controller:InputManager;
	var player:SquareBro;
	var renderer:GraphicsHandler;
	var state:EGameState;
	
	override public function init() {
		super.init();
		state = EGameState.load;
		d00dz = new Array();
		canvas = cast document.getElementById("thescreen");
		renderer = new GraphicsHandler(canvas);
		controller = new InputManager(canvas);
		player = new SquareBro(renderer, ESquareType.player);
		d00dz.push(player);
		var createcount:Int = 15;
		for (i in 0...createcount) {
			this.d00dz.push(new SquareBro(renderer, ESquareType.telporter));
		}
		for (i in 0...createcount) {
			this.d00dz.push(new SquareBro(renderer, ESquareType.walker));
		}
		player.x = 100;
		player.y = 100;
		player.speed = 5;
		
	}
	
	override public function tick() {
		//Browser.console.log("tick");
		var up = controller.checkKeyDown(38);
		var down = controller.checkKeyDown(40);
		var left = controller.checkKeyDown(37);
		var right = controller.checkKeyDown(39);
		var spawn = controller.checkMouseDown();
		player.dir.x = 0;
		player.dir.y = 0;
		if (up) {
			player.dir.y = -1;
		}
		if (down) {
			player.dir.y = 1;
		}
		if (left) {
			player.dir.x = -1;
		}
		if (right) {
			player.dir.x = 1;
		}
		if (spawn) {
			d00dz.push(new SquareBro(renderer, ESquareType.walker));
		}
		for (i in 0...d00dz.length) {
			d00dz[i].tick();
		}
	}
	
	/*if (event.keyCode == 38) {
			self.parent.y--;
		} else if(event.keyCode == 39) {
			self.parent.x++;
		} else if(event.keyCode == 40) {
			self.parent.y++;
		} else if(event.keyCode == 37) {
			self.parent.x--;
		}*/
	
	override public function draw() {
		//Browser.console.log("draw!");
		renderer.ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (i in 0...d00dz.length) {
			d00dz[i].draw();
		}
	}
	
}