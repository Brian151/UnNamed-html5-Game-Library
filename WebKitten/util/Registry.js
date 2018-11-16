(function(targetscope){
	var registry = function() {
		this.widgets = [];
	}
	registry.prototype.addWidget = function(name,thing) {
		var isNameUnique = this.findName();
		if (isNameUnique > -1) {
			this.widgets.push({
				id:name,
				widget:thing
			});
		}
	}
	registry.prototype.findName = function(name) {
		var out = -1;
		for (var i=0; i < this.widgets.length; i++) {
			var curr = this.widgets[i];
			if (curr.id == name) {
				out = i;
				break;
			}
		}
		return out;
	}
	registry.prototype.getWidget = function(name) {
		var exists = this.findName(name);
		if (exists > -1) {
			return this.widgets[exists].widget;
		}
		return new Error("ERROR : " + name + " IS NOT A VALID REGISTRY ENTRY!");
	}
	var groupregistry = function() {
		this.widgetgroups = [];
	}
	groupregistry.prototype.addGroup = function(name,group,thing) {
		var isUnique = this.findGroup(name,group);
		if (isUnique > -1) {
			var item = this.widgetgroups.length;
			this.widgetgroups.push({
				id : name,
				tags : [],
				widget : thing
			});
			for (var i = 0; i < group.length; i++) {
				this.widgetgroups[item].tags[i] = group[i];
			}
		}
	}
	groupregistry.prototype.findGroup = function(name,tags) {
		var out = -1;
		for (var i=0 ; i < this.widgetgroups.length; i++) {
			var curr = this.widgetgroups[i];
			if (curr.id == name) {
				out = i;
				return out;
			}
			for (var j = 0; j < curr.tags.length; j++) {
				var curr2 = curr.tags[j];
				for (var k = 0; k < tags.length; k++) {
					var curr3 = tags[k];
					if (curr3 == curr2) {
						out = i;
						return out;
					}
				}
			}
		}
	}
	groupregistry.prototype.getWidgetByTag = function(tag) {
		var search = [tag];
		var exists = this.findGroup("DEFAULT",search);
		if (exists > -1) {
			return this.widgetgroups[exists].widget;
		}
		return new Error("ERROR : NO WIDGET WIH THE TAG " + tag + " IS REGISTRED!");
	}
	targetscope.WebKittenSimpleRegisty = registry;
	targetscope.WebKittenComplexRegisty = groupregistry;
})(this);