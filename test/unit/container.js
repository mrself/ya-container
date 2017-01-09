var chai = require('chai'),
	assert = chai.assert,
	expect = chai.expect,
	sinon = require('sinon'),

	sn,
	Container = require('Index'),
	container;

chai.use(require('sinon-chai'));

beforeEach(function() {
	sn = sinon.sandbox.create();
	container = Container.make();
});

afterEach(function() {
	sn.restore();
});

describe('.make', function() {
	it('return instance', function() {
		expect(Container.make()).to.be.an.instanceof(Container);
	});
});
describe('#add', function() {
	it('add a property to data', function() {
		var obj = {prop: 1};
		container.add('id', obj);
		expect(container.data.id).to.eql(obj);
	});

	it('throw if there is already such a dependency', function() {
		var obj = {prop: 1};
		container.add('id', obj);
		expect(container.add.bind(container, 'id', obj)).to.throw();
	});
});

describe('#get', function() {
	it('return a dependency by id', function() {
		var obj = {prop: 1};
		container.data.id = obj;
		expect(container.get('id')).to.eql(obj);
	});

	it('throw if dependency does not exist', function() {
		expect(container.get.bind(container, 'id')).to.throw();
	});
});

describe('#change', function() {
	it('update a dependency with a result from a callback', function() {
		var obj = {prop: 1};
		container.data.id = obj;
		container.change('id', function() {
			return {prop: 2};
		});
		expect(container.get('id')).to.eql({prop: 2});
	});
});

describe('#_checkType', function() {
	it('do not throw if dep is an object or a function', function() {
		expect(container._checkType.bind(container, {})).not.to.throw();
		expect(container._checkType.bind(container, new Function)).not.to.throw();
	});

	it('throw if dep is not an object or a function', function() {
		expect(container._checkType.bind(container, 1)).to.throw();
		expect(container._checkType.bind(container, '1')).to.throw();
		expect(container._checkType.bind(container, true)).to.throw();
	});
});

describe('Plugin', function() {
	it('#plugin: add a prop to plugins', function() {
		function Pl () {}
		Pl._name = 'plugin';
		container.plugin(Pl);
		expect(container.plugins).to.eql({plugin: Pl});
	});

	describe('#runPlugin', function() {
		it('set container option with options provided', function() {
			var run = sn.stub();
			container.plugins.plugin = {run: run};
			container.runPlugin('plugin');
			expect(run).to.have.been.calledWith({container: container});
		});
		it('set container option with no options provided', function() {
			var run = sn.stub();
			container.plugins.plugin = {run: run};
			container.runPlugin('plugin', {prop: 1});
			expect(run).to.have.been.calledWith({container: container, prop: 1});
		});
	});
});