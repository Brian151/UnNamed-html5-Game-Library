package kittengine.core;
import js.Browser;
import js.html.CanvasElement;

/**
 * ...
 * @author Brian
 */
class InputManagerold 
{
	var mouseTGT:CanvasElement;
	var timing:Int = 30;
	var keyStates:Array<Dynamic>;
	var mouseState:Dynamic = {
		mX : 0,
		mY : 0,
		down : false
	};

	public function new(tgt:CanvasElement) {
		mouseTGT = tgt;
		var self:InputManagerold = this;
		
		for (i in 0...512) {
			keyStates.push({
				id : i,
				strID : String.fromCharCode(i),
				cooldown : timing,
				state : "inactive",
				down : false
			});
		}
			
		mouseTGT.addEventListener("mousemove", function(event) {
			var x:Int = event.clientX - self.mouseTGT.offsetLeft;
			var y:Int = event.clientY - self.mouseTGT.offsetTop;
			self.mouseState.x = x;
			self.mouseState.y = y;
		});
			
		mouseTGT.addEventListener("mousedown", function(event) {
			self.mouseState.down = true;
		});
			
		mouseTGT.addEventListener("mouseup", function(event) {
			self.mouseState.down = false;
		});
			
		Browser.document.addEventListener("keydown", function(event) {
			//http://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
			switch (event.keycode) {
				// arrows
				// haxe switches don't support fall-through... >.<
				case 37 : event.preventDefault();
				case 38 : event.preventDefault();
				case 39 : event.preventDefault();
				case 40 : event.preventDefault();
				case 32 : event.preventDefault(); // space
				default : ;
			}
			var current:Dynamic = self.keyStates[event.keycode];
			if (current.lock != "press" && current.lock != "disabled") {
				current.cooldown = self.timing;
			}
			current.state = "active";
			current.down = true;
		});
			
		Browser.document.addEventListener("keyup", function(event) {
			var current:Dynamic = self.keyStates[event.keycode];
			current.down = false;
			if (current.lock = "press") {
				current.lock = "enabled";
				current.cooldown = 0;
			} 	
		});
	}
	
	public function checkMouseCollision(e:Dynamic) : Bool {
		if (e.x + e.width >= mouseState.mX && e.x <= mouseState.mX && e.y + e.height >= mouseState.mY && e.y <= mouseState.mY) {
			return true;
		}
		return false;
	}
	
	public function checkKeyDown(keyID, keyName) : Bool {
		var current = keyStates[keyID];
		if (current.down && current.lock != "disabled") {
			return true;
		}
		return false;
	}
	
	public function checkKeyPress(keyID, keyName) : Bool {
		var current = keyStates[keyID];
		if (current.state == "active" && current.lock != "press" && current.lock != "disabled") {
			current.state = "inactive";
			current.lock = "press";
			current.down = false;
			return true;
		}
		return false;
	}
	
	public function tick() {
		for (i in 0...512) {
			var current:Dynamic = keyStates[i];
			if (current.state == "active") {
				if (current.cooldown >= 1) {
					current.cooldown--;
				} else {
					current.state = "inactive";
				}
			}
		}
	}
	
}