import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { getEntries } from '../../../server/api/arpTable.js';
import { processedThreeEntries, processedRealARP } from '../api/processed.js';

var assert = chai.assert,
  expect = chai.expect;

const testFilesPath = 'test/arpTable/';

describe('arpTable', function() {
  it('processes correct arpTables', function() {
    var result = getEntries(Assets.getText(testFilesPath + 'threeEntries.txt'));
    for (var i = result.length - 1; i >= 0; i--) {
      delete result[i].updatedAt;
    }
    assert.deepEqual(result, processedThreeEntries);
  });

  it('processes another correct arpTables', function() {
    var result = getEntries(Assets.getText(testFilesPath + 'realARP.txt'));
    for (var i = result.length - 1; i >= 0; i--) {
      delete result[i].updatedAt;
    }
    assert.deepEqual(result, processedRealARP);
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
