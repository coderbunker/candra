import { HTTP } from 'meteor/http';
import { chai } from 'meteor/practicalmeteor:chai';

var assert = chai.assert,
    expect = chai.expect;

const CorrectTable = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.11     0x1         0x2         8c:3a:e3:93:83:93     *        br0\r\n192.168.1.50     0x1         0x2         00:26:bb:07:54:80     *        br0\r\n192.168.1.18     0x1         0x2         3c:15:c2:cc:dc:2a     *        br0';

describe('API', function() {

    it('accepts correct call', function() {
        HTTP.call(
            'POST',
            Meteor.absoluteUrl() + 'routerapi/v1/arp/candra', 
            { headers: { 'Authorization': 'Bearer abcd' }, data: { arpTable: CorrectTable } },
            function(error, result) {
                assert(!error, 'there was an error: \n' + error);
                assert(result.statusCode == 200, 'Status code didn\'t match 200 it was ' + result.statusCode);
                assert(App.Collections.ARPEntries.find().count() >= 3, 'test addresses were not added successfully')
            }
        );
    });

    it('no router', function(done) {
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

    it('no authorization token', function(done) {
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

    it('wrong authorization key', function(done) {
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

    it('no data', function(done) {
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
