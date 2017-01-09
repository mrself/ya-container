require('base');

var Index = require('Registrar/Index');

beforeEach(function() {
	index = new Index;
});

describe('#add', function() {
	it('call #addOne for each dependency', function() {
		var dep = {};
		index.options = {dependencies: [dep]};
		var stub = sn.stub(index, 'addOne');
		index.add();
		expect(stub).to.have.been.calledWith(dep);
	});
});