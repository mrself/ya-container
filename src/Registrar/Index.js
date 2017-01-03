var Item = require('./Item');

function Index () {

	var self = this;

	this.items = [];

	this.run = function() {
		this.resolveOptions();
		this.add();
		this.register();
		this.boot();
	};

	this.add = function() {
		this.options.dependencies.forEach(function(dep) {
			self.addOne(this.options.dependencies[key]);
		});
	};

	this.addOne = function(options) {
		var Item = Item.init(options, container);
		this.items.push(item);
	};

	this.register = function() {
		this.items.forEach(function(item) {
			item.register();
		});
	};

	this.boot = function() {
		this.items.forEach(function(item) {
			item.boot();
		});
	};

	this.setOptions = function() {
		this.options = extend(true, {}, this.constructor.defaults, options);
	};

	this.resolveOptions = function() {
		this.container = this.options.container;
	};
}

Index.defaults = {
	containerName: 'app'
};

Index.run = function(options) {
	var inst = new this;
	inst.setOptions();
	inst.run();
	return inst;
};

module.exports = Index;