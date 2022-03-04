package kittengine.core.service;
import js.Browser;
import js.html.CanvasElement;
import js.html.KeyboardEvent;
import js.html.MouseEvent;

/**
 * ...
 * @author Brian
 */

typedef TKeyState =
{
	id: Int,
	strID: String,
	cooldown: Int,
	state: EState,
	down: Bool,
	lock: ELock,
};

typedef TRectangle =
{
	x: Int,
	y: Int,
	width: Int,
	height: Int,
};

enum EState
{
	ACTIVE;
	INACTIVE;
}
 
enum ELock
{
	PRESS;
	ENABLED;
	DISABLED;
}
 
class InputManager 
{
	private static inline var MAX = 512;
	private var mouseTGT:CanvasElement;
	private var timing:Int = 30;
	private var keyStates:Array<TKeyState>; // just make it an array?
	private var mouseState = {
		x: 0,
		y: 0,
		mX: 0,
		mY: 0,
		down: false,
	};

	public function new(tgt:CanvasElement) {
		mouseTGT = tgt;
		keyStates = new Array<TKeyState>();
		
		for (i in 0...MAX) {
			keyStates.push({
				id: i,
				strID: String.fromCharCode(i),
				cooldown: timing,
				state: EState.INACTIVE,
				down: false,
				lock: ELock.ENABLED,
			});
		}
			
		mouseTGT.addEventListener("mousemove", function(event:MouseEvent) {
			mouseState.x = event.clientX - mouseTGT.offsetLeft;
			mouseState.y = event.clientY - mouseTGT.offsetTop;
		});
			
		mouseTGT.addEventListener("mousedown", function(event:MouseEvent) {
			mouseState.down = true;
		});
			
		mouseTGT.addEventListener("mouseup", function(event:MouseEvent) {
			mouseState.down = false;
		});
			
		Browser.document.addEventListener("keydown", function(event:KeyboardEvent) {
			//http://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
			switch (event.keyCode) {
				// arrows and space
				case 37, 38, 39, 40, 32 : event.preventDefault();
				default : null;
			}
			var current = keyStates[event.keyCode];
			if (current.lock != ELock.PRESS && current.lock != ELock.DISABLED) {
				current.cooldown = timing;
			}
			current.state = EState.ACTIVE;
			current.down = true;
		});
			
		Browser.document.addEventListener("keyup", function(event) {
			var current = keyStates[event.keyCode];
			current.down = false;
			if (current.lock == ELock.PRESS) {
				current.lock = ELock.ENABLED;
				current.cooldown = 0;
			} 	
		});
	}
	
	public function checkMouseCollision(e:TRectangle) : Bool {
		if ( ( e.x + e.width ) >= mouseState.mX && e.x <= mouseState.mX && ( e.y + e.height ) >= mouseState.mY && e.y <= mouseState.mY) {
			return true;
		}
		return false;
	}
	
	public function checkKeyDown(keyID:Int) : Bool {
		var current = keyStates[keyID];
		if (current.down && current.lock != ELock.DISABLED) {
			return true;
		}
		return false;
	}
	
	public function checkKeyPress(keyID:Int) : Bool {
		var current = keyStates[keyID];
		//if (current.state == EState.ACTIVE && current.lock != ELock.PRESS && testing.lock != ELock.DISABLED) {
		if (current.state == EState.ACTIVE && current.lock != ELock.PRESS) {
			current.state = EState.INACTIVE;
			current.lock = ELock.PRESS;
			current.down = false;
			return true;
		}
		return false;
	}
	
	public function tick() {
		for (current in keyStates) {
			if (current.state == EState.ACTIVE) {
				if (current.cooldown >= 1) {
					current.cooldown--;
				} else {
					current.state = EState.INACTIVE;
				}
			}
		}
	}
	
	public function checkMouseDown() {
		return mouseState.down;
	}
	
}