import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { getEntries, isMAC, isIP } from '../../../server/api/endpoints.js';

var assert = chai.assert,
    expect = chai.expect;

const NoEntries = 'IP address       HW type     Flags       HW address            Mask     Device';
const ThreeEntries = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.11     0x1         0x2         8c:3a:e3:93:83:93     *        br0\r\n192.168.1.50     0x1         0x2         00:26:bb:07:54:80     *        br0\r\n192.168.1.18     0x1         0x2         3c:15:c2:cc:dc:2a     *        br0';

const processedThreeEntries = [{
    IP: '192.168.1.11',
    MAC: '8C:3A:E3:93:83:93'
}, {
    IP: '192.168.1.50',
    MAC: '00:26:BB:07:54:80'
}, {
    IP: '192.168.1.18',
    MAC: '3C:15:C2:CC:DC:2A'
}];

describe('MAC regex', function() {
    it('accepts dash notation MAC', function() {
        assert(isMAC('00-26-BB-07-54-80'));
    });

    it('accepts column notation MAC', function() {
        assert(isMAC('8C:3A:E3:93:83:93'));
    });

    it('rejects too short MAC', function() {
        assert(!isMAC('00-26-BB-07-54'));
    });

    it('rejects too long MAC', function() {
        assert(!isMAC('00:26:BB:07:54:34:FD'));
    });

    it('rejects lower case MAC', function() {
        assert(!isMAC('00-26-bb-07-54-80'));
    });

    it('rejects empty MAC', function() {
        assert(!isMAC(''));
    });

    it('rejects MAC without separation', function() {
        assert(!isMAC('0026BB075480'));
    });
});

describe('IP regex', function() {
    it('accepts correct IP', function() {
        assert(isIP('192.168.1.50'));
    });

    it('rejects too long IP', function() {
        assert(!isIP('192.168.1.50.23'));
    });

    it('rejects too short IP', function() {
        assert(!isIP('192.168.1'));
    });

    it('rejects too high value IP', function() {
        assert(!isIP('192.521.1.50'));
    });

    it('rejects IP with characters', function() {
        assert(!isIP('192.168.1a.50'));
    });

    it('rejects IP with columns', function() {
        assert(!isIP('192:168:1:50'));
    });

    it('rejects IP with dashes', function() {
        assert(!isIP('192-168-1-50'));
    });

    it('rejects IP with no separation', function() {
        assert(!isIP('192168150'));
    });

    it('rejects empty IP', function() {
        assert(!isIP(''));
    });
});

describe('arpTable', function() {
    it('processes correct arpTables', function() {
        var result = getEntries(ThreeEntries);
        for (var i = result.length - 1; i >= 0; i--) {
            delete result[i].updatedAt;
        }
        console.log(result);
        assert.deepEqual(result, processedThreeEntries);
    });

    it('processes correct empty arpTables', function() {
        var result = getEntries(NoEntries);
        console.log(result);
        assert.deepEqual(result, []);
    });
});
