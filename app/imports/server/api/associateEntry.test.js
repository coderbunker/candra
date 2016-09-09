import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { associateEntry } from '../../../server/api/arpTable.js';
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

const ExtraEntry = {
  IP: '192.168.1.19',
  MAC: '3C:15:C2:CC:DC:2B',
  updatedAt: new Date()
};

const MissingMAC = {
  IP: '192.168.1.19',
  updatedAt: new Date()
};

const MissingIP = {
  MAC: '3C:15:C2:CC:DC:2B',
  updatedAt: new Date()
};

const MissingUpdatedAt = {
  IP: '192.168.1.19',
  MAC: '3C:15:C2:CC:DC:2B',
};

describe('associateEntry', function() {
  beforeEach(function() {
    ARPEntries.remove({});
    entries.forEach((entry) => {
      ARPEntries.insert(entry);
    });
  });

  it('adds the entry if it is not present yet',function(){
  	associateEntry(ExtraEntry);
  	assert.equal(ARPEntries.find({'MAC': ExtraEntry.MAC}).count(), 1);
  	assert.equal(ARPEntries.find().count(), 4);
  });

  it('does not add the the entry if it is present',function(){
  	associateEntry(entries[0]);
  	assert.equal(ARPEntries.find().count(), 3);
  });

  it('does not add the the entry if it is missing the MAC address',function(){
  	associateEntry(MissingMAC);
  	assert.equal(ARPEntries.find().count(), 3);
  });

  it('does not add the the entry if it is missing the IP address',function(){
  	associateEntry(MissingIP);
  	assert.equal(ARPEntries.find().count(), 3);
  });

  it('does not add the the entry if it is missing the updatedAt field',function(){
  	associateEntry(MissingUpdatedAt);
  	assert.equal(ARPEntries.find().count(), 3);
  });

});
