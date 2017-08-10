var GameObjs = {};

var LoadingGame = stampit.compose(QualityCatGameLibrary.Game,{
	props : {
		progress : 0,
		complete : 5,
		countDown : 10,
		timer : 0,
		stateCoolDown : false,
		currentLoader : 0
	},
	deepProps : {
		loaders : [],
		loader : {}
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
					var imports = ["Math","ProgressMeter","ProgressBar","ProgressDonut","ProgressThrobber"];
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
						}
					}
				} else {
					this.progress += .01;
				}
				
				this.loader.tick();
			}
		},
		draw : function() {
			if (this.state == "play") {
				this.graphics.clearRect(0,0,600,400);
				this.loader.draw();
			}
		}
	}
});

var theGame = LoadingGame();
theGame.start("gameScreen");