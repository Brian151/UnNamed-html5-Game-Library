function AssetManager() {

}

function InputManager(parent) {
	this.parent = parent;
	var self = this;
	this.timer = 0;
	this.timing = 30;
	this.timerOn = false;
	
	this.parent.canvas.addEventListener("mousemove",function(event){
	self.mouseX = event.clientX - parent.canvas.offsetLeft;
	self.mouseY = event.clientY - parent.canvas.offsetTop;
	});
	
	this.parent.canvas.addEventListener("mousedown",function(event){
	self.mouseDown = true;
	});
	
	this.parent.canvas.addEventListener("mouseup",function(event){
	self.mouseDown = false;
	});
	
	document.addEventListener("keydown",function(event){
	self.keyCode = event.keyCode;
	self.key_press = String.fromCharCode(event.keyCode);
	self.keyDown = true;
	/*
	if (event.keyCode == 38) {
			self.parent.y--;
		} else if(event.keyCode == 39) {
			self.parent.x++;
		} else if(event.keyCode == 40) {
			self.parent.y++;
		} else if(event.keyCode == 37) {
			self.parent.x--;
		}*/
	});
	
	document.addEventListener("keyup",function(event){
	self.keyCode = event.keyCode;
	self.key_press = String.fromCharCode(event.keyCode);
	self.keyDown = false;
	self.timer = 0;
	self.timerOn = true;
	});
	
	this.checkKeyDown = function(keyID,keyName) {
		var out = false;
		if (this.keyDown){
			if ((this.keyCode == keyID) || (this.key_press == keyName)) {
				out = true;
			}
		}
		return out;
	}
	
	this.checkKeyPress = function(keyID,keyName) {
		var out = false;
		if (!this.keyDown){
			if(this.timerOn) {
				if ((this.keyCode == keyID) || (this.key_press == keyName)) {
				out = true;
				this.timer = 0;
				this.timerOn = false;
				}
			}
		}
		return out;
	}
	
	this.tick =  function() {
		if (this.timerOn) {
			if (this.timer >= this.timing) {
				this.timer = 0;
				this.timerOn = false;
			} else {
				this.timer++;
			}
		}
	}
	
}

function GraphicsHandler(canvas) {
	this.ctx = canvas.getContext("2d");
	this.draw = function() {
	
	}
}

function SoundSystem() {
	
}

function SquareBro(parent,isPlayer,color,AI) {
	this.parent = parent;
	this.isPlayer = isPlayer;
	this.AI = AI;
	this.x = 0;
	this.y = 0;
	this.dir = {"x":0,"y":0}
	this.speed = 10;
	this.timer = 0;
	this.timing = Math.floor((Math.random() * 100) + 1)
	if(!this.isPlayer){
		this.color = "#0000ff";
	} else {
		this.color = "#2595F5"
	}
	if (color) {
		this.color = color;
	}
}
SquareBro.prototype.tick = function(){
	if (this.timer >= this.timing){this.timer = 0;}
	if((!this.isPlayer) && (!this.AI)){
		if (this.timer == 0) {
		this.x = Math.floor((Math.random() * (600)) + 1);
		this.y = Math.floor((Math.random() * (400)) + 1);
		}
	} else if ((!this.isPlayer) && (this.AI)){
		if (this.timer == 0) {
		this.dir.x = Math.floor((Math.random() * this.speed));
		this.dir.y = Math.floor((Math.random() * this.speed));
		var flipX = Math.floor((Math.random() * 2));
		var flipY = Math.floor((Math.random() * 2));
		if (flipX){
			this.dir.x *= -1;
		}
		if (flipY){
			this.dir.y *= -1;
		}
		this.timing = Math.floor((Math.random() * 400) + 1)
		}
		this.x += this.dir.x;
		this.y += this.dir.y;
	}
	this.timer++;
	if (this.x < 0) {
		this.x = 0;
	}
	if (this.y < 0) {
		this.y = 0;
	}
	if (this.x > this.parent.canvas.width - 64) {
		this.x = this.parent.canvas.width - 64;
	}
	if (this.y > this.parent.canvas.height - 64) {
		this.y = this.parent.canvas.height - 64;
	}
}
SquareBro.prototype.draw = function(){
	this.parent.renderer.ctx.fillStyle = this.color;
	this.parent.renderer.ctx.fillRect(this.x,this.y,64,64);
}

function Game() {
	this.state = "standby";
	var self = this;
	this.timing = 33; //approx 30 FPS
	
	this.setFPS = function(fps){
		this.timing = Math.round(1000 / fps);
	}
	
	this.init = function(canvasID) {
		this.state = "load";
		this.canvas = document.getElementById(canvasID);
		this.controller = new InputManager(this);
		this.assets = new AssetManager();
		this.renderer = new GraphicsHandler(this.canvas);
		this.sound = new SoundSystem();
		//custom shizz here
		this.setFPS(30);
		this.d00dz = [];
		for (var i=0; i < 5; i++){
			this.d00dz.push(new SquareBro(this));
			//console.log("created another dude! " + "(" + i + ")");
		}
		this.d00dz.push(this.player = new SquareBro(this,true));
		this.player.x = 100;
		this.player.y = 100;
		this.player.speed = 5;
		this.psMeter = document.getElementById("PS_Meter");
		this.bMeter = document.getElementById("Bro_Meter");
		this.b1Meter = document.getElementById("Bro1_Meter");
		this.b2Meter = document.getElementById("Bro2_Meter");
		this.b3Meter = document.getElementById("Bro3_Meter");
		
	}
	
	this.draw = function() {
		//customize
		//console.log(this.x + " , " + this.y);
		this.renderer.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		var b1c = 0;
		var b2c = 0;
		var b3c = 0;
		for (var i = 0; i < this.d00dz.length; i++){
			var current = this.d00dz[i];
			current.draw();
			if (!current.isPlayer) {
				if(current.AI){
					b2c++;
				} else {
					b1c++;
					
				}
			} else {
				b3c++;
			}
		}
		this.psMeter.innerHTML = this.player.speed;
		this.bMeter.innerHTML = this.d00dz.length;
		this.b1Meter.innerHTML = b1c;
		this.b2Meter.innerHTML = b2c;
		this.b3Meter.innerHTML = b3c;
		if(this.state == "paused"){
			this.renderer.ctx.fillStyle = "#000000";
			this.renderer.ctx.font = "bold 16px Arial";
			this.renderer.ctx.fillText("PAUSED",10,20);
		}
	}
	
	this.tick = function() {
		//customize
		//console.log("run");
		this.controller.tick();
		var pauseToggle = this.controller.checkKeyPress(80,"P");
		if (pauseToggle){
			if (this.state == "paused"){
				this.state = "playing";
			} else {
				this.state = "paused";
			}
		}
		if (this.state != "paused"){
		for (var i = 0; i < this.d00dz.length; i++){
			this.d00dz[i].tick();
		}
		var up = this.controller.checkKeyDown(38);
		var right = this.controller.checkKeyDown(39);
		var down = this.controller.checkKeyDown(40);
		var left = this.controller.checkKeyDown(37);
		if (up) {
			this.player.y -= this.player.speed ;
		} else if(right) {
			this.player.x += this.player.speed;
		} else if(down) {
			this.player.y += this.player.speed;
		} else if(left) {
			this.player.x -= this.player.speed;
		}
		
		this.player.tick();
		var cmd = this.controller.checkKeyDown(67,"C");
		var increaseSpeed = this.controller.checkKeyPress(87,"W");
		var decreaseSpeed = this.controller.checkKeyPress(83,"S");
		if (increaseSpeed) {
			this.player.speed++;
		}
		if(decreaseSpeed) {
			this.player.speed--;
		}
		if (cmd) {
			var exe = prompt("enter command:",'{"c":"announce","p":"This is your admin speaking!"}');
			var msg = JSON.parse(exe).p;
			alert(msg);
			//console.log("[ADMIN] SENT ANNOUNCEMENT: " + msg);
		}
		var clicked = this.controller.mouseDown;
		if (clicked) {
			this.d00dz.push(new SquareBro(this,false,"#ff0000",true));
			//console.log("Created new Square Brother!");
		}
		}
		this.draw();
	}
}

var game = new Game();
game.init("gameScreen");
var loop = setInterval(function(){game.tick();},game.timing);