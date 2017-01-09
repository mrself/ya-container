Container.Registarar = require('./Registrar/Index');

function Container () {
	this.data = {};
	this.configData = {};
}

Container.prototype = {
	constructor: Container,

	add: function(id, dep) {
		if (this.data[id])
			throw new Error('A dependency with a provided id already exist');
		this.data[id] = dep;
		this.configData[id] = dep.containerConfig || {};
	},

	get: function(id) {
		if (!this.data[id])
			throw new Error('A dependency with a provided id does not exist');
		return this.data[id];
	},

	change: function(id, cb) {
		var dep = this.get(id);
		var newDep = cb(dep);
		if (this._checkType(dep));
		this.data[id] = newDep;
	},

	_checkType: function(dep) {
		if (typeof dep != 'function' && typeof dep != 'object')
			throw new TypeError('Depenedency type can be an object or a function');
	},
};

Container.make = function() {
	return new this;
};

module.exports = Container;