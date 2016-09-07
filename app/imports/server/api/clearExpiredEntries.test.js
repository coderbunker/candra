import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { clearExpiredEntries } from '../../../server/api/arpTable.js';
import '../../../lib/collections/ARPEntries.js';

var assert = chai.assert,
  expect = chai.expect;

const entries = [{
  IP: '192.168.1.11',
  MAC: '8C:3A:E3:93:83:93',
  updatedAt: new Date()
}, {
  IP: '192.168.1.50',
  MAC: '00:26:BB:07:54:80',
  updatedAt: new Date()
}, {
  IP: '192.168.1.18',
  MAC: '3C:15:C2:CC:DC:2A',
  updatedAt: new Date()
}];

describe('clearExpiredEntries', function() {

  beforeEach(function() {
    App.Collections.ARPEntries.remove({});
    entries.forEach((entry) => {
      App.Collections.ARPEntries.insert(entry);
    });
  });

  it('does nothing if nothing changed', function() {
    clearExpiredEntries(entries);
    assert.equal(App.Collections.ARPEntries.find().count(), 3);
  });

  it('removes 1 entries that has expired', function() {
    clearExpiredEntries([entries[0], entries[1]]);
    assert.equal(App.Collections.ARPEntries.find().count(), 2);
  });

  it('removes 2 entries that have expired', function() {
    clearExpiredEntries([entries[0]]);
    assert.equal(App.Collections.ARPEntries.find().count(), 1);
  });

  it('removes all entries that have expired', function() {
    clearExpiredEntries([]);
    assert.equal(App.Collections.ARPEntries.find().count(), 0);
  });

  it('doesn\'t add new entries', function() {
    clearExpiredEntries([entries[0], entries[1], entries[2], {
      IP: '192.168.1.19',
      MAC: '3C:15:C2:CC:DC:2B',
      updatedAt: new Date()
    }]);
    assert.equal(App.Collections.ARPEntries.find().count(), 3);
  });
});
