//add.test.js

var add = require('../src/add');
var expect = require('chai').expect; // mocha 没有expect 断言语句 需要引用chai.js

describe('add test',function(){
	it('x+y return true',function(){
		expect(add(1,3)).to.be.equal(4);
	});
});
