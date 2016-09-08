import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { clearExpiredEntries } from '../../../server/api/arpTable.js';
import '../../../lib/collections/ARPEntries.js';

var assert = chai.assert,
  expect = chai.expect;

var ARPEntries = App.Collections.ARPEntries;

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

const extraEntry = {
  IP: '192.168.1.19',
  MAC: '3C:15:C2:CC:DC:2B',
  updatedAt: new Date()
};

describe('clearExpiredEntries', function() {

  beforeEach(function() {
    ARPEntries.remove({});
    entries.forEach((entry) => {
      ARPEntries.insert(entry);
    });
  });

  it('does nothing if nothing changed', function() {
    clearExpiredEntries(entries);
    assert.equal(ARPEntries.find().count(), 3);
  });

  it('removes 1 entries that has expired', function() {
    clearExpiredEntries([entries[0], entries[1]]);
    assert.equal(ARPEntries.find().count(), 2);
  });

  it('removes 2 entries that have expired', function() {
    clearExpiredEntries([entries[0]]);
    assert.equal(ARPEntries.find().count(), 1);
  });

  it('removes all entries that have expired', function() {
    clearExpiredEntries([]);
    assert.equal(ARPEntries.find().count(), 0);
  });

  it('does not add new entries', function() {
    clearExpiredEntries([entries[0], entries[1], entries[2], extraEntry]);
    assert.equal(ARPEntries.find().count(), 3);
  });
});
