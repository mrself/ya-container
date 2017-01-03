function Booter () {
	var self = this;

	this.run = function() {
		for (var key in this.data) {
			var dep = this.data[key];
			var config = this.configData[key];
			this.boot(dep, config);
		}
	};

	this.boot = function(dep, config) {
		this.registerChilds();
		this.
	};
}

Booter.run = function(options) {
	var inst = new this;
	inst.setOptions();
	inst.run();
};