function Child () {
	/**
	 * Name of the child in the container
	 * @type {string}
	 */
	this.containerName = undefined;

	/**
	 * Child name
	 * @type {string}
	 */
	this.name = undefined;

	this.run = function() {
		this.resolveOptions();
		this.defineName();
		this.defineLocalName();
		this.defineContainerName();
	};

	this.defineName = function() {
		if (this.dep.containerConfig && this.dep.containerConfig.name) {
			this.name = this.dep.containerConfig.name;
		} else
			this.name = this.options.name || this.dep._name || this.dep.getName();
	};

	this.defineContainerName = function() {
		if (this.options.globalName)
			this.containerName = this.options.globalName;
		else {
			this.containerName = this.getNamespace() + '.' + this.name;
		}
	};

	this.getNamespace = function() {
		return this.options.namespace || this.parentName;
	};

	this.defineLocalName = function() {
		this.localName = this.options.localName || this.name;
	};

	this.getParentContainerData = function() {
		return {
			globalName: this.containerName,
			localName: this.localName
		};
	};

	this.getParentDependencyData = function() {
		return {
			name: this.containerName,
			value: this.dep
		};
	};

	this.resolveOptions = function() {
		this.dep = this.options.value;
	};
}

Child.make = function(childOptions, parentName, container) {
	var inst = new this;
	inst.container = container;
	inst.parentName = parentName;
	inst.options = childOptions;
	inst.run();
	return inst;
};

module.exports = Child;