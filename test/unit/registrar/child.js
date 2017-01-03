require('base');
var Child = require('Registrar/Child');

describe('#defineContainerName', function() {
	it('set globalName option if it exists', function() {
		var child = new Child;
		child.options = {
			globalName: 'globalName'
		};
		child.defineContainerName();
		expect(child.containerName).to.eql('globalName');
	});

	it('otherwise set set namespace with own name', function() {
		var child = new Child;
		child.options = {};
		child.name = 'name';
		sn.stub(child, 'getNamespace').returns('namespace');
		child.defineContainerName();
		expect(child.containerName).to.eql('namespace.name');
	});
});