import { HTTP } from 'meteor/http';
import { chai } from 'meteor/practicalmeteor:chai';

var assert = chai.assert,
    expect = chai.expect;

describe('API', function () {
  it('no router', function (done) {
    HTTP.call('POST', Meteor.absoluteUrl() + 'routerapi/v1/arp/unknown', {}, 
    function(err, res) { 
      assert.deepEqual(res.data, { 
        success: false,
        message: 'this router does not exist in configuration'
      });
      assert.equal(res.statusCode, 404);
      done();
    });
  });

  it('no authorization token', function (done) {
    HTTP.call('POST', Meteor.absoluteUrl() + 'routerapi/v1/arp/candra', {}, 
      function(err, res) {
        assert.deepEqual(res.data, { 
          success: false,
          message: 'authorization token missing'
        });
        assert.equal(res.statusCode, 401);
        done();
    });
  });

  it('wrong authorization key', function (done) {
    HTTP.call('POST', Meteor.absoluteUrl() + 'routerapi/v1/arp/candra', { 
      headers: {
        Authorization: 'Bearer WRONG'
      }
    }, 
      function(err, res) {
        assert.deepEqual(res.data, { 
          success: false,
          message: 'wrong authorization key'
        });
        assert.equal(res.statusCode, 401);
        done();
    });
  });

  it('no data', function (done) {
    console.log(Meteor.absoluteUrl());
    HTTP.call('POST', Meteor.absoluteUrl() + 'routerapi/v1/arp/candra', {
      headers: {
        Authorization: 'Bearer abcd'
      }
    }, 
      function(err, res) {
        assert.deepEqual(res.data, { 
          success: false,
          message: 'invalid request, missing arpTable'
        });
        assert.equal(res.statusCode, 400);
        done();
    });
  });
});