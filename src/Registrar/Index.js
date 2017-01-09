var Item = require('./Item');
var extend = require('extend');

function Index () {

	var self = this;

	this.items = [];

	this.run = function() {
		this.resolveOptions();
		this.add();
		this.initItems();
	};

	this.add = function() {
		var self = this;
		this.options.dependencies.forEach(function(dep) {
			self.addOne(self.options.dependencies[key]);
		});
	};

	this.addOne = function(options) {
		var Item = Item.init(options, container);
		this.items.push(item);
	};

	this.initItems = function() {
		this.items.forEach(function(item) {
			item.run();
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
	inst.setOptions(options);
	inst.run();
	return inst;
};

module.exports = Index;