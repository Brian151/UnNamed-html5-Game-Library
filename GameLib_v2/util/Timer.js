(function(){
"use strict";
var Timer = stampit.deepProps({
	time : {
		days : 0,
		hours : 0,
		mins : 0,
		secs : 0
	},
	timeEnd : {
		days : 0,
		hours : 0,
		mins : 0,
		secs : 0
	},
	timeStart : {
		days : 0,
		hours : 0,
		mins : 0,
		secs : 0
	},
	timeElapsed : {
		days : 0,
		hours : 0,
		mins : 0,
		secs : 0
	},
	dateStart : {}
}).props({
	state : "stopped", // "running", "stopped"
	complete : false
}).methods({
	tick : function() {
		if (this.state == "running") {
			var temp = new Date();
			this.time = {
				days : temp.getDate(),
				hours : temp.getHours(),
				mins : temp.getMinutes(),
				secs : temp.getSeconds()
			};
			/* 
				to-do : 
					Some way of verifying jsDate is installed
					leap years ?
			*/
			this.timeElapsed.days = Date.DateDiff("d",this.dateStart,temp) %365;
			this.timeElapsed.hours = Date.DateDiff("h",this.dateStart,temp) %24;
			this.timeElapsed.mins = Date.DateDiff("n",this.dateStart,temp) %60;
			this.timeElapsed.secs = Date.DateDiff("s",this.dateStart,temp) %60;
			// console.log(JSON.stringify(this.timeElapsed));
			if (
				(this.timeElapsed.days >= this.timeEnd.days) &&
				(this.timeElapsed.hours >= this.timeEnd.hours) &&
				(this.timeElapsed.mins >= this.timeEnd.mins) &&
				(this.timeElapsed.secs >= this.timeEnd.secs)
			){
				this.timeElapsed = {
					days : this.timeEnd.days,
					hours : this.timeEnd.hours,
					mins : this.timeEnd.mins,
					secs : this.timeEnd.secs
				};
				this.stop(true);
			}
		}
	},
	setTiming : function(days,hours,mins,secs) {
		this.timeEnd = {
			days : days,
			hours : hours,
			mins : mins,
			secs : secs
		};
	},
	doReset : function(end) {
		this.timeStart = {
			days : 0,
			hours : 0,
			mins : 0,
			secs : 0
		}
		this.time = {
			days : 0,
			hours : 0,
			mins : 0,
			secs : 0
		};
		this.timeElapsed = {
			days : 0,
			hours : 0,
			mins : 0,
			secs : 0
		};
		if (end) {
			this.timeEnd = {
				days : 0,
				hours : 0,
				mins : 0,
				secs : 0
			};
		}
		this.stop(false);
		this.complete = false;
	},
	stop : function(finish) {
		this.state = "stopped";
		if (finish)
			this.complete = true;
	},
	start : function() {
		var temp = this.dateStart = new Date();
		this.timeStart = {
			days : temp.getDate(),
			hours : temp.getHours(),
			mins : temp.getMinutes(),
			secs : temp.getSeconds()
		};
		this.state = "running";
	},
	toString : function(total) {
		var out =  this.timeElapsed.days + ":" + this.timeElapsed.hours + 
		":" + this.timeElapsed.mins + ":" + this.timeElapsed.secs;
		if (total) {
			out += " / " + this.timeEnd.days + ":" + this.timeEnd.hours + 
		":" + this.timeEnd.mins + ":" + this.timeEnd.secs;
		}
		return out;
	}
});
QualityCatGameLibrary.attachModule(Timer,"Timer");})();