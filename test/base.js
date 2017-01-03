global.chai = require('chai');
global.assert = chai.assert;
global.expect = chai.expect;

var sinon = require('sinon');

chai.use(require('sinon-chai'));

beforeEach(function() {
	global.sn = sinon.sandbox.create();
});

afterEach(function() {
	sn.restore();
});