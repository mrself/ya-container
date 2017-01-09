require('base');

var Index = require('Registrar/Index');

function Container () {
	this.get = function() {
		
	};
	this.add = function() {
		
	};
}

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