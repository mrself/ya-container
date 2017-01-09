require('base');

var Index = require('Registrar/Index');

var Container = require('Index');

var dependencies = [
	{
		name: 'dep1',
		value: function Dep1() {}
	}
];

describe('run', function() {
	it('without errors', function() {
		var container = new Container;
		var index = Index.run({
			container: container,
			dependencies: dependencies
		});
	});
});

describe('boot', function() {
	it('boot recursively', function() {
		var container = new Container;
		function F2() {}
		F2.containerConfig = {
			name: 'f2',
			childs: [{value: F3}]
		};
		function F3() {};
		F3.containerConfig = {
			name: 'f3',
			childs: [{value: F4}]
		};
		function F4() {};
		F4.containerConfig = {
			name: 'f4',
			childs: [{value: F5}]
		};
		function F5() {};
		F5.containerConfig = {
			name: 'f5',
		};
		F5.boot = sn.spy();
		dependencies[0].value.containerConfig = {childs: [{value: F2}]};
		var index = Index.run({
			container: container,
			dependencies: dependencies
		});
		index.boot();
		expect(F5.boot).to.have.been.called;
	});
});