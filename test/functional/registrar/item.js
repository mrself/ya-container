require('base');
var Item = require('Registrar/Item');

function Container () {
	this.data = {};
	this.add = function(id, dep) {
		this.data[id] = dep;
	};
}

describe('#init', function() {
	var dep;
	beforeEach(function() {
		function F1() {}
		dep = {
			name: 'dep',
			value: F1
		};
	});

	it('define dep prop', function() {
		var item = Item.init(dep, new Container);
		expect(item.dep).to.eql(dep.value);
	});

	it('set containerConfig if it does not exists', function() {
		var item = Item.init(dep, new Container);
		expect(dep.value.containerConfig).not.to.be.undefined;
	});

	describe('set name', function() {
		it('set from options if it exists', function() {
			var item = Item.init(dep, new Container);
			expect(item.name).to.eql('dep');
		});

		it('set from dep config', function() {
			delete dep.name;
			dep.value.containerConfig = {name: 'dep1'};
			var item = Item.init(dep, new Container);
			expect(item.name).to.eql('dep1');
		});

		it('if dep config name does not exists set from dep #getName', function() {
			dep.value.getName = function() {
				return 'dep1';
			};
			delete dep.name;
			var item = Item.init(dep, new Container);
			expect(item.name).to.eql('dep1');
		});
	});
});

describe('#registerChilds', function() {
	var dep;
	beforeEach(function() {
		function F1() {}
		dep = {
			name: 'dep',
			value: F1
		};
	});

	it('register to the container when name is defined in childs config', function() {
		function F2() {}
		dep.value.containerConfig = {
			childs: [{
				name: 'f2',
				value: F2
			}]
		};
		var container = new Container;
		var item = Item.init(dep, container);
		item.registerChilds();
		expect(container.data['dep.f2']).to.eql(F2);
	});

	it('register recursively', function() {
		function F2() {}
		dep.value.containerConfig = {
			childs: [{
				name: 'f2',
				value: F2
			}]
		};
		function F3() {}
		F2.containerConfig = {
			childs: [{
				name: 'f3',
				value: F3
			}]
		};
		function F4() {}
		F3.containerConfig = {
			childs: [{
				name: 'f4',
				value: F4
			}]
		};
		function F5() {}
		F4.containerConfig = {
			childs: [{
				name: 'f5',
				value: F5
			}]
		};
		var container = new Container;
		var item = Item.init(dep, container);
		item.registerChilds();
		expect(container.data['dep.f2']).to.eql(F2);
		expect(container.data['dep.f2.f3']).to.eql(F3);
		expect(container.data['dep.f2.f3.f4']).to.eql(F4);
		expect(container.data['dep.f2.f3.f4.f5']).to.eql(F5);
		item.boot();
	});
});