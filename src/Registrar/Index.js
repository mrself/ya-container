var Item = require('./Item');
var extend = require('extend');

function Index () {

	var self = this;

	this.items = [];

	this.run = function() {
		this.resolveOptions();
		this.add();
	};

	this.add = function() {
		var self = this;
		this.options.dependencies.forEach(function(dep) {
			self.addOne(dep);
		});
	};

	this.addOne = function(options) {
		var item = Item.init(options, this.container);
		this.items = this.items.concat(item.childs);
		this.items.push(item);
	};

	this.load = function() {
		this.items.forEach(function(item) {
			item.load();
		});
	};

	this.boot = function() {
		this.items.forEach(function(item) {
			item.boot();
		});
		$(document).trigger('deps:boot.app');
	};

	this.setOptions = function(options) {
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