import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { getEntries } from '../../../server/api/endpoints.js';

var assert = chai.assert,
  expect = chai.expect;

const NoEntries = 'IP address       HW type     Flags       HW address            Mask     Device';
const ThreeEntries = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.11     0x1         0x2         8c:3a:e3:93:83:93     *        br0\r\n192.168.1.50     0x1         0x2         00:26:bb:07:54:80     *        br0\r\n192.168.1.18     0x1         0x2         3c:15:c2:cc:dc:2a     *        br0';

const DoubleIP = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.11     0x1         0x2         8c:3a:e3:93:83:93     *        br0     192.168.1.17';
const DoubleMAC = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.11     0x1         0x2         8d:3a:e3:93:83:93     *        br0       8c:3a:e3:93:83:93';
const NoMAC = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.11     0x1         0x2             *        br0     192.168.1.11 ';
const NoIP = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168     0x1         0x2             *        br0     8c:3a:e3:93:83:93';
const NoIPnorMAC = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168     0x1         0x2             *        br0   ';
const ReUsedMAC = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.11     0x1         0x2         8c:3a:e3:93:83:93     *        br0\r\n192.168.1.50     0x1         0x2         8c:3a:e3:93:83:93     *        br0\r\n192.168.1.18     0x1         0x2         8c:3a:e3:93:83:93     *        br0';
const ReUsedIP = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.50     0x1         0x2         8c:3a:e3:93:83:93     *        br0\r\n192.168.1.50     0x1         0x2         8c:3a:e3:93:83:94     *        br0\r\n192.168.1.50     0x1         0x2         8c:3a:e3:93:83:92     *        br0';
const ReUsedIPandMAC = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.50     0x1         0x2         8c:3a:e3:93:83:93     *        br0\r\n192.168.1.50     0x1         0x2         8c:3a:e3:93:83:93     *        br0\r\n192.168.1.50     0x1         0x2         8c:3a:e3:93:83:93     *        br0';

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

describe('arpTable', function() {
  it('processes correct arpTables', function() {
    var result = getEntries(ThreeEntries);
    for (var i = result.length - 1; i >= 0; i--) {
      delete result[i].updatedAt;
    }
    assert.deepEqual(result, processedThreeEntries);
  });

  it('processes empty arpTables', function() {
    assert.deepEqual(getEntries(NoEntries), []);
  });

  it('handles Two IP addresses in one entry', function() {
    getEntries(DoubleIP);
  });

  it('handles Two MAC addresses in one entry', function() {
    getEntries(DoubleMAC);
  });

  it('handles no MAC address in one entry', function() {
    getEntries(NoMAC);
  });

  it('handles no IP address in one entry', function() {
    getEntries(NoIP);
  });

  it('handles no IP nor MAC address in one entry', function() {
    getEntries(NoIPnorMAC);
  });

  it('handles multiple entries with same IP', function() {
    getEntries(ReUsedIP);
  });

  it('handles multiple entries with same MAC', function() {
    getEntries(ReUsedIP);
  });

  it('handles multiple entries with same MAC and IP', function() {
    getEntries(ReUsedIPandMAC);
  });

});
