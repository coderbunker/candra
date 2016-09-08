import { isMAC, isIP } from '../regexes.js';
import '../../lib/collections/ARPEntries.js';
import '../../lib/collections/APICalls.js';

ARPEntries = App.Collections.ARPEntries;
APICalls = App.Collections.APICalls;

const isMACreg = new RegExp("([0-9A-F]{2}[:-]){5}([0-9A-F]{2})");
const isIPreg = new RegExp("(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])");

var getEntries = function(arpTable) {
  entries = [];
  var rows = arpTable.split("\n");

  rows.forEach((row, index) => {
    if (index === 0)
      return;

    row = row.toUpperCase();

    var MAC = isMACreg.exec(row);
    var IP = isIPreg.exec(row);

    if(!IP){
      throw new Error('no IP');
    }
    if(!MAC){
      throw new Error('no MAC');
    }

    entries.push({
      'updatedAt': new Date(),
      'IP': IP[0],
      'MAC': MAC[0]
    });

  });

  return entries;
};

var clearExpiredEntries = function(entries) {
  // The user is not connected to the router anymore
  // Clean up mongodb: if MAC address is in mongodb but not in router table, remove it from mongodb

  var currentMAC = _.map(ARPEntries.find().fetch(), (entry) => entry.MAC);
  var newMAC = _.map(entries, (entry) => entry.MAC);
  var MACtoRemove = _.difference(currentMAC, newMAC);

  MACtoRemove.forEach((MAC) => {
    ARPEntries.remove({ MAC: MAC });
  });

  APICalls.update({ api: 'arp' }, { $set: { success: true } });
}

var associateEntry = function(entry) {
  if (entry.MAC && entry.IP && entry.updatedAt) {
    var ARPEntry = ARPEntries.findOne({ MAC: entry.MAC });

    // A new user connected to the router
    // If MAC address doesn't exist in mongodb, add it
    if (!ARPEntry) {

      var response;

      try {
        response = HTTP.call("POST", "http://api.macvendors.com/" + entry.MAC);
      } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        // Do nothing continue
      }

      if (response && response.content) {
        entry.company = response.content;
      } else {
        console.log('error: could not get response from macvendors');
        console.log(response);
      }

      ARPEntries.insert(entry);
    }

    // The user changed IP address
    // If MAC address exists in mongodb and different IP address, update entry
    if (ARPEntry) {
      if (ARPEntry.IP !== entry.IP) {
        ARPEntries.update(ARPEntry, { $set: { IP: entry.IP } });
      }
    }
  }
}

export { getEntries, clearExpiredEntries, associateEntry, NoIPException, NoMACException };