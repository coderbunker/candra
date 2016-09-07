import { isMAC, isIP } from '../regexes.js';
import '../../lib/collections/ARPEntries.js';
import '../../lib/collections/APICalls.js';

ARPEntries = App.Collections.ARPEntries;
APICalls = App.Collections.APICalls;

var getEntries = function(arpTable) {

  entries = [];
  var rows = arpTable.split("\n");

  rows.forEach((row, index) => {
    if (index === 0)
      return;
    var values;
    //remove double spaces
    row = row.replace(/ +(?= )/g, '');
    values = row.split(" ");

    var IP;
    var MAC;

    //test if the field is an IP or MAC
    values.forEach((field) => {
      if (!IP && isIP(field)) {
        IP = field;
      } else if (!MAC) {
        field = field.toUpperCase();
        if (isMAC(field)) {
          MAC = field;
        }
      }
    })

    //if both fields are found in the row push.
    if (IP && MAC) {
      entries.push({
        'updatedAt': new Date(),
        'IP': IP,
        'MAC': MAC
      });
    }

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

export { getEntries, clearExpiredEntries, associateEntry };
