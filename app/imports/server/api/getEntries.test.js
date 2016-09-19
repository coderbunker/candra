import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { getEntries } from '../../../server/api/arpTable.js';

var assert = chai.assert,
  expect = chai.expect;

const testFilesPath = 'test/arpTable/';

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
    var result = getEntries(Assets.getText(testFilesPath + 'threeEntries.txt'));
    for (var i = result.length - 1; i >= 0; i--) {
      delete result[i].updatedAt;
    }
    assert.deepEqual(result, processedThreeEntries);
  });

  it('processes empty arpTables', function() {
    assert.deepEqual(getEntries(Assets.getText(testFilesPath + 'noEntries.txt')), []);
  });

  it('does not allow no MAC address in entry', function() {
    assert.throws(function(){
      getEntries(Assets.getText(testFilesPath + 'noMAC.txt'));
    }, Error, 'no MAC')
  });

  it('does not allow no IP address in entry', function() {
    assert.throws(function(){
      getEntries(Assets.getText(testFilesPath + 'noIP.txt'));
    }, Error, 'no IP')
  });

  it('does not allow no IP nor MAC address in entry', function() {
    assert.throws(function(){
      getEntries(Assets.getText(testFilesPath + 'noIPnorMAC.txt'));
    }, Error, 'no IP')
  });

});
