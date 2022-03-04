package testing.demo1.obj;
import js.Browser;
import kittengine.core.GraphicsHandler;
import kittengine.objects.GameObject;
import kittengine.core.api.BasicGraphicsAPI;
import kittengine.objects.sprites.SimpleSprite;

enum ESquareType {
	walker;
	telporter;
	player;
}

typedef TDir = {
	x : Int,
	y : Int
};

/**
 * ...
 * @author Brian
 */
class SquareBro extends GameObject
{
	public var dir:TDir;
	public var speed:Int = 10;
	var timing:Int;
	var timer:Int;
	var color:String;
	var frame:Int;
	var sprite:SimpleSprite;
	public var x:Int;
	public var y:Int;
	var mytype:ESquareType;
	

	public function new(type:ESquareType,spr:SimpleSprite) {
		super();
		// gfx = tgt;
		mytype = type;
		timing = Math.round(Math.random() * 800);
		timer = 0;
		x = Math.floor(Math.random() * 600);
		y = Math.floor(Math.random() * 400);
		dir = {
			x : (-1 + Math.floor(Math.random() * 3)),
			y : (-1 + Math.floor(Math.random() * 3))
		}
		sprite = spr;
		
		switch (type) {
			case ESquareType.player :
				color = "#2595f5";
				dir.x = 0;
				dir.y = 0;
				frame = 0;
			case ESquareType.walker :
				color = "#ff0000";
				frame = 2;
			case ESquareType.telporter :
				color = "#0000ff";
				speed = 0;
				frame = 1;
		}
	}
	
	public override function draw() {
		//Browser.console.log("draw square!");
		BasicGraphicsAPI.setFillStyle(color);
		BasicGraphicsAPI.fillRect(x, y, 64, 64);
		sprite.drawFrame(frame,x,y);
	}
	
	public override function tick() {
		x += dir.x * speed;
		y += dir.y * speed;
		if (timer % timing == 0) {
			timer = 0;
			// Browser.console.log(mytype + " does somthing");
			switch(mytype) {
				case ESquareType.telporter:
					// Browser.console.log("i teleport! from " + x + " " + y);
					x = Math.floor(Math.random() * 600);
					y = Math.floor(Math.random() * 400);
					// Browser.console.log("to " + x + " " + y);
				case ESquareType.walker :
					dir.x = Math.floor(Math.random() * speed);
					dir.y = Math.floor(Math.random() * speed);
					var flipX:Int = Math.floor(Math.random() * 2);
					var flipY:Int = Math.floor(Math.random() * 2);
					if (flipX == 1) {
						dir.x = (-1 + Math.floor(Math.random() * 3));
					}
					if (flipY == 1) {
						dir.y = (-1 + Math.floor(Math.random() * 3));
					}
				case ESquareType.player :
					// no AI
			}
			timing = Math.round(Math.random() * 800);
		}
		timer++;
		if (x < 0) {
			x = 0;
		} else if (x > (600 - 64)) {
			x = (600 - 64);
		}
		if (y < 0) {
			y = 0;
		} else if (y > (400 - 64)) {
			y = (400 - 64);
		}
	}
	
}