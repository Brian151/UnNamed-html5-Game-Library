// Generated by Haxe 3.4.4
(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var kittengine_core_Game = function() {
	this.deltaDraw = 0;
	this.deltaTick = 0;
	this.timingDraw = 0;
	this.timingTick = 16;
};
kittengine_core_Game.__name__ = true;
kittengine_core_Game.prototype = {
	setUPS: function(perSecond) {
		if(perSecond > 0) {
			this.timingTick = Math.round(1000 / perSecond);
		} else {
			this.timingTick = Math.round(33.333333333333336);
		}
	}
	,setFPS: function(perSecond) {
		if(perSecond > 0) {
			this.timingDraw = Math.round(1000 / perSecond);
		} else {
			this.timingDraw = 0;
		}
	}
	,tick: function() {
	}
	,draw: function() {
	}
	,init: function() {
		this.timeNow = new Date();
		this.timeLast = this.timeNow;
		window.console.log("HI THERE!");
	}
	,run: function(num) {
		this.timeNow = new Date();
		this.deltaTick = (this.timeNow - this.timeLast) / this.timingTick;
		this.deltaDraw = (this.timeNow - this.timeLast) / this.timingDraw;
		if(this.deltaTick >= 1) {
			this.deltaTick--;
			this.tick();
		}
		if(this.deltaDraw >= 1) {
			this.deltaDraw--;
			this.draw();
		}
		this.timeLast = this.timeNow;
		window.requestAnimationFrame($bind(this,this.run));
	}
};
var kittengine_core_GraphicsHandler = function(tgt) {
	this.ctx = tgt.getContext("2d",null);
	this.canvas = tgt;
};
kittengine_core_GraphicsHandler.__name__ = true;
kittengine_core_GraphicsHandler.prototype = {
	drawClippedImage: function(img,x,y,w,h,ix,iy,iw,ih) {
		if(iw == 0 || iy == 0) {
			this.ctx.drawImage(img,ix,iy,w,h,x,y,w,h);
		} else {
			this.ctx.drawImage(img,ix,iy,iw,ih,x,y,w,h);
		}
	}
	,drawImage: function(img,x,y) {
		this.ctx.drawImage(img,x,y);
	}
	,getImageData: function(x,y,w,h) {
		return this.ctx.getImageData(x,y,w,h);
	}
	,fillRect: function(x,y,width,height) {
		this.ctx.fillRect(x,y,width,height);
	}
};
var kittengine_core_EState = { __ename__ : true, __constructs__ : ["ACTIVE","INACTIVE"] };
kittengine_core_EState.ACTIVE = ["ACTIVE",0];
kittengine_core_EState.ACTIVE.__enum__ = kittengine_core_EState;
kittengine_core_EState.INACTIVE = ["INACTIVE",1];
kittengine_core_EState.INACTIVE.__enum__ = kittengine_core_EState;
var kittengine_core_ELock = { __ename__ : true, __constructs__ : ["PRESS","ENABLED","DISABLED"] };
kittengine_core_ELock.PRESS = ["PRESS",0];
kittengine_core_ELock.PRESS.__enum__ = kittengine_core_ELock;
kittengine_core_ELock.ENABLED = ["ENABLED",1];
kittengine_core_ELock.ENABLED.__enum__ = kittengine_core_ELock;
kittengine_core_ELock.DISABLED = ["DISABLED",2];
kittengine_core_ELock.DISABLED.__enum__ = kittengine_core_ELock;
var kittengine_core_InputManager = function(tgt) {
	this.mouseState = { x : 0, y : 0, mX : 0, mY : 0, down : false};
	this.timing = 30;
	var _gthis = this;
	this.mouseTGT = tgt;
	this.keyStates = [];
	var _g = 0;
	while(_g < 512) {
		var i = _g++;
		this.keyStates.push({ id : i, strID : String.fromCharCode(i), cooldown : this.timing, state : kittengine_core_EState.INACTIVE, down : false, lock : kittengine_core_ELock.ENABLED});
	}
	this.mouseTGT.addEventListener("mousemove",function(event) {
		_gthis.mouseState.x = event.clientX - _gthis.mouseTGT.offsetLeft;
		_gthis.mouseState.y = event.clientY - _gthis.mouseTGT.offsetTop;
	});
	this.mouseTGT.addEventListener("mousedown",function(event1) {
		_gthis.mouseState.down = true;
	});
	this.mouseTGT.addEventListener("mouseup",function(event2) {
		_gthis.mouseState.down = false;
	});
	window.document.addEventListener("keydown",function(event3) {
		var _g1 = event3.keyCode;
		switch(_g1) {
		case 32:case 37:case 38:case 39:case 40:
			event3.preventDefault();
			break;
		default:
		}
		var current = _gthis.keyStates[event3.keyCode];
		if(current.lock != kittengine_core_ELock.PRESS && current.lock != kittengine_core_ELock.DISABLED) {
			current.cooldown = _gthis.timing;
		}
		current.state = kittengine_core_EState.ACTIVE;
		current.down = true;
	});
	window.document.addEventListener("keyup",function(event4) {
		var current1 = _gthis.keyStates[event4.keyCode];
		current1.down = false;
		if(current1.lock == kittengine_core_ELock.PRESS) {
			current1.lock = kittengine_core_ELock.ENABLED;
			current1.cooldown = 0;
		}
	});
};
kittengine_core_InputManager.__name__ = true;
kittengine_core_InputManager.prototype = {
	checkMouseCollision: function(e) {
		if(e.x + e.width >= this.mouseState.mX && e.x <= this.mouseState.mX && e.y + e.height >= this.mouseState.mY && e.y <= this.mouseState.mY) {
			return true;
		}
		return false;
	}
	,checkKeyDown: function(keyID) {
		var current = this.keyStates[keyID];
		if(current.down && current.lock != kittengine_core_ELock.DISABLED) {
			return true;
		}
		return false;
	}
	,checkKeyPress: function(keyID) {
		var current = this.keyStates[keyID];
		if(current.state == kittengine_core_EState.ACTIVE && current.lock != kittengine_core_ELock.PRESS) {
			current.state = kittengine_core_EState.INACTIVE;
			current.lock = kittengine_core_ELock.PRESS;
			current.down = false;
			return true;
		}
		return false;
	}
	,tick: function() {
		var _g = 0;
		var _g1 = this.keyStates;
		while(_g < _g1.length) {
			var current = _g1[_g];
			++_g;
			if(current.state == kittengine_core_EState.ACTIVE) {
				if(current.cooldown >= 1) {
					current.cooldown--;
				} else {
					current.state = kittengine_core_EState.INACTIVE;
				}
			}
		}
	}
	,checkMouseDown: function() {
		return this.mouseState.down;
	}
};
var testing_Main = function() { };
testing_Main.__name__ = true;
testing_Main.main = function() {
	var game = new testing_demo1_Demo1();
	game.init();
	game.run(0);
};
var testing_demo1_EGameState = { __ename__ : true, __constructs__ : ["load","play"] };
testing_demo1_EGameState.load = ["load",0];
testing_demo1_EGameState.load.__enum__ = testing_demo1_EGameState;
testing_demo1_EGameState.play = ["play",1];
testing_demo1_EGameState.play.__enum__ = testing_demo1_EGameState;
var testing_demo1_Demo1 = function() {
	kittengine_core_Game.call(this);
};
testing_demo1_Demo1.__name__ = true;
testing_demo1_Demo1.__super__ = kittengine_core_Game;
testing_demo1_Demo1.prototype = $extend(kittengine_core_Game.prototype,{
	init: function() {
		kittengine_core_Game.prototype.init.call(this);
		this.state = testing_demo1_EGameState.load;
		this.d00dz = [];
		this.canvas = window.document.getElementById("thescreen");
		this.renderer = new kittengine_core_GraphicsHandler(this.canvas);
		this.controller = new kittengine_core_InputManager(this.canvas);
		this.player = new testing_demo1_obj_SquareBro(this.renderer,testing_demo1_obj_ESquareType.player);
		this.d00dz.push(this.player);
		var createcount = 15;
		var _g1 = 0;
		var _g = createcount;
		while(_g1 < _g) {
			var i = _g1++;
			this.d00dz.push(new testing_demo1_obj_SquareBro(this.renderer,testing_demo1_obj_ESquareType.telporter));
		}
		var _g11 = 0;
		var _g2 = createcount;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.d00dz.push(new testing_demo1_obj_SquareBro(this.renderer,testing_demo1_obj_ESquareType.walker));
		}
		this.player.x = 100;
		this.player.y = 100;
		this.player.speed = 5;
	}
	,tick: function() {
		var up = this.controller.checkKeyDown(38);
		var down = this.controller.checkKeyDown(40);
		var left = this.controller.checkKeyDown(37);
		var right = this.controller.checkKeyDown(39);
		var spawn = this.controller.checkMouseDown();
		this.player.dir.x = 0;
		this.player.dir.y = 0;
		if(up) {
			this.player.dir.y = -1;
		}
		if(down) {
			this.player.dir.y = 1;
		}
		if(left) {
			this.player.dir.x = -1;
		}
		if(right) {
			this.player.dir.x = 1;
		}
		if(spawn) {
			this.d00dz.push(new testing_demo1_obj_SquareBro(this.renderer,testing_demo1_obj_ESquareType.walker));
		}
		var _g1 = 0;
		var _g = this.d00dz.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.d00dz[i].tick();
		}
	}
	,draw: function() {
		this.renderer.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		var _g1 = 0;
		var _g = this.d00dz.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.d00dz[i].draw();
		}
	}
});
var testing_demo1_obj_ESquareType = { __ename__ : true, __constructs__ : ["walker","telporter","player"] };
testing_demo1_obj_ESquareType.walker = ["walker",0];
testing_demo1_obj_ESquareType.walker.__enum__ = testing_demo1_obj_ESquareType;
testing_demo1_obj_ESquareType.telporter = ["telporter",1];
testing_demo1_obj_ESquareType.telporter.__enum__ = testing_demo1_obj_ESquareType;
testing_demo1_obj_ESquareType.player = ["player",2];
testing_demo1_obj_ESquareType.player.__enum__ = testing_demo1_obj_ESquareType;
var testing_demo1_obj_SquareBro = function(tgt,type) {
	this.speed = 10;
	this.gfx = tgt;
	this.mytype = type;
	this.timing = Math.round(Math.random() * 800);
	this.timer = 0;
	this.x = Math.floor(Math.random() * 600);
	this.y = Math.floor(Math.random() * 400);
	this.dir = { x : -1 + Math.floor(Math.random() * 3), y : -1 + Math.floor(Math.random() * 3)};
	switch(type[1]) {
	case 0:
		this.color = "#ff0000";
		break;
	case 1:
		this.color = "#0000ff";
		this.speed = 0;
		break;
	case 2:
		this.color = "#2595f5";
		this.dir.x = 0;
		this.dir.y = 0;
		break;
	}
};
testing_demo1_obj_SquareBro.__name__ = true;
testing_demo1_obj_SquareBro.prototype = {
	draw: function() {
		this.gfx.ctx.fillStyle = this.color;
		this.gfx.fillRect(this.x,this.y,64,64);
	}
	,tick: function() {
		this.x += this.dir.x * this.speed;
		this.y += this.dir.y * this.speed;
		if(this.timer % this.timing == 0) {
			this.timer = 0;
			window.console.log(Std.string(this.mytype) + " does somthing");
			var _g = this.mytype;
			switch(_g[1]) {
			case 0:
				var tmp = Math.random() * this.speed;
				this.dir.x = Math.floor(tmp);
				var tmp1 = Math.random() * this.speed;
				this.dir.y = Math.floor(tmp1);
				var flipX = Math.floor(Math.random() * 2);
				var flipY = Math.floor(Math.random() * 2);
				if(flipX == 1) {
					var tmp2 = Math.floor(Math.random() * 3);
					this.dir.x = -1 + tmp2;
				}
				if(flipY == 1) {
					var tmp3 = Math.floor(Math.random() * 3);
					this.dir.y = -1 + tmp3;
				}
				break;
			case 1:
				window.console.log("i teleport! from " + this.x + " " + this.y);
				this.x = Math.floor(Math.random() * 600);
				this.y = Math.floor(Math.random() * 400);
				window.console.log("to " + this.x + " " + this.y);
				break;
			case 2:
				break;
			}
			this.timing = Math.round(Math.random() * 800);
		}
		this.timer++;
		if(this.x < 0) {
			this.x = 0;
		} else if(this.x > 536) {
			this.x = 536;
		}
		if(this.y < 0) {
			this.y = 0;
		} else if(this.y > 336) {
			this.y = 336;
		}
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
kittengine_core_InputManager.MAX = 512;
testing_Main.main();
})();
