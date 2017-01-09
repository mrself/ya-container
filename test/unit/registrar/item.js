require('base');
var Item = require('Registrar/Item');

var item;

beforeEach(function() {
	item = new Item();
});


describe('#setDeps', function() {
	it('should set "deps" prop', function() {
		item.dep = function () {};
		function Dep1() {}
		item.config = {dependencies: [
			{globalName: 'dep1'}
		]};
		var container = item.container = {};
		container.get = sn.stub().returns(Dep1);
		item.setDeps();
		expect(item.dep.deps).to.eql({dep1: Dep1});
	});
});