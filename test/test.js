var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var QueryEntity = require('../src/models/queryEntity');

chai.should();

describe('QueryEntity', function () {
    var qe;
               
    it('should construct QueryEntity object with param1 and param2', function () {
        qe = new QueryEntity('p1', 'p2');
        qe.param1.exists;
        qe.param2.exists;
    });
    
    it('should call the callback when given good params', function () {
        qe = new QueryEntity('cerebrovascular', 'prasugrel');
        var spy = sinon.spy();
        qe.getJSON(spy, function() {
            qe.type.should.exist;
            qe.ID.should.exist;
            spy.called.should.be.true;
        });
    });
    
    it('should still call the cb when given bad params', function () {
        qe = new QueryEntity('p1', 'p2');
        var spy = sinon.spy();
        qe.getJSON(spy, function() {
            qe.type.should.exist;
            qe.ID.should.exist;
            spy.called.should.be.true;
        });
    })

});