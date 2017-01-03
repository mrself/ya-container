var extend = require('extend');
var inherits = require('inherit-class');
var Child = require('./Child');

function Item () {
	var self = this;

	this.init = function() {
		this.resolveOptions();
		this.dep.containerConfig = this.dep.containerConfig || {};
		this.setConfig();
		this.defineName();
	};

	this.run = function() {
		this.register();
		this.extend();
		this.boot();
	};

	this.setConfig = function() {
		this.config = this.dep.containerConfig = extend(true, {}, {
			childs: [],
			dependencies: [],
			extend: []
		}, this.dep.containerConfig);
	};

	this.register = function() {
		this.container.add(this.name, this.dep);
		this.registerChilds();
	};

	this.extend = function() {
		this.config.extend.forEach(function(options) {
			var parent = this.container.get(options.name);
			inherits(this.dep, parent, options.parentName);
		});
	};

	this.boot = function() {
		if (!this.config.booted || !this.dep.boot) return;
		this.dep.boot(this.container);
	};

	this.registerChilds = function() {
		this.config.childs.forEach(function(child) {
			var child = Child.make(child, self.name, self.container);
			self.initChildItem(child);
		});
	};

	this.initChildItem = function(child) {
		var item = Item.init(child.getParentDependencyData(), this.container);
		item.run();
		self.config.dependencies.push(child.getParentContainerData());
	};

	this.resolveOptions = function() {
		this.dep = this.options.value;
		this.name = this.options.name;
	};

	this.defineName = function() {
		this.name = this.options.name || this.config.name || this.dep.getName();
	};

}

Item.init = function(options, container) {
	var inst = new this;
	inst.container = container;
	inst.options = options;
	inst.init();
	return inst;
};

module.exports = Item;