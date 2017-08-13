var GameObjs = {};

var LoadingGame = stampit.compose(QualityCatGameLibrary.Game,{
	props : {
		progress : 0,
		complete : 5,
		countDown : 10,
		timer : 0,
		stateCoolDown : false,
		currentLoader : 0,
		iterator : 0
	},
	deepProps : {
		loaders : [],
		loader : {},
		timerTest : {}
	},
	methods : {
		start : function(mainCanvas) {
			this.canvas = document.getElementById(mainCanvas);
			this.graphics = GameObjs.renderer = new GraphicsHandler(this.canvas);
			this.run();
		},
		tick : function() {
			
			this.ticks++;
			
			if (this.state == "boot") {
				if (this.ticks < 100) {
					var notLoaded = false;
					// this is actually not working right...
					var imports = ["Math","ProgressMeter","ProgressBar","ProgressDonut","ProgressThrobber","Timer"];
					for (var i=0; i < imports.length; i++) {
						var test = QualityCatGameLibrary.hasAttachedModule(imports[i]);
						if (!test) {
							break;
						}
					}
					console.log("required modules loaded : " + !notLoaded);
					if (!notLoaded) {
						var meter = QualityCatGameLibrary.ProgressMeter();
						var bar = QualityCatGameLibrary.ProgressBar();
						bar.setSize(300,25);
						var donut = QualityCatGameLibrary.ProgressDonut();
						donut.setSize(75,25);
						var evil = QualityCatGameLibrary.ProgressThrobber();
						evil.setSize(75,25);
						this.loaders.push(meter,bar,donut,evil);
						for (var i=0; i < this.loaders.length; i++) {
							this.loaders[i].attachTo(this,300,200,{});
							this.loaders[i].syncTo(this,"progress","complete");
						}
						this.loader = this.loaders[this.currentLoader];
						this.state = "play";
						this.timerTest = QualityCatGameLibrary.Timer();
						this.timerTest.setTiming(1,3,3,7);
						this.timerTest.start();
					}
				}
			}
			
			if(this.state == "play") {
				if (this.progress >= this.complete) {
					this.progress = this.complete;
					if (!this.stateCooldown) {
						this.stateCooldown = true;
					} else {
						this.timer++;
						if (this.timer >= this.countDown) {
							this.stateCooldown = false;
							this.progress = 0;
							this.timer = 0;
							this.currentLoader++;
							if (this.currentLoader >= this.loaders.length) this.currentLoader = 0;
							this.loader = this.loaders[this.currentLoader];
							// console.clear();
						}
					}
				} else {
					this.progress += .01;
				}
				this.timerTest.tick();
				/* if (!(this.iterator % 10)) {
					console.log(JSON.stringify(this.timerTest.timeStart) + " | " + JSON.stringify(this.timerTest.time));
					console.log("TIMER : " + this.timerTest.toString());
				}
				this.iterator++;
				if (this.iterator >= 1000) {
					this.iterator = 0;
				} */
				this.loader.tick();
			}
		},
		draw : function() {
			if (this.state == "play") {
				this.graphics.ctx.fillStyle = "#000080";
				this.graphics.fillRect(0,0,600,400);
				this.loader.draw();
				this.graphics.ctx.fillStyle = "#ff0000";
				var time = "TIMER  :  " + this.timerTest.toString(true);
				this.graphics.ctx.font = "24px Verdana";
				this.graphics.ctx.fillText(time,300,32);
			}
		}
	}
});

var theGame = LoadingGame();
theGame.start("gameScreen");