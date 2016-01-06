RouterApi = new Restivus({
  apiPath: 'routerapi/',
  version: 'v1'
});

RouterApi.addRoute(
  'router/arp/:name',
  {authRequired: false},
  {
    post() {

      var ARPEntries = App.Collections.ARPEntries;
      var LastAPICall = App.Collections.LastAPICall;
      var request = this.request;
      var response = this.response;
      var key, arpTable, headers = request.headers;
      var routers = App.routers;
      var router = _.findWhere(routers, {name: this.params.name});

      if (!router) {
        response.end(JSON.stringify({success: false, message: 'this router does not exist in configuration'}));
        return;
      }

      if (!headers.authorization) {
        response.end(JSON.stringify({success: false, message: 'authorization token missing'}));
        return;
      }

      key = headers.authorization.substring(7);

      if (key !== router.key) {
        response.end(JSON.stringify({success: false, message: 'wrong authorization key'}));
        return;
      }

      LastAPICall.upsert({api: 'arp'}, {api: 'arp', time: new Date(), clientIP: request.headers['x-forwarded-for']});

      arpTable = request.body.arpTable;

      var rows = arpTable.split("\n");
      var entries = [];

      rows.forEach((row, index) => {
        if (index === 0) return;
        var values;
        row = row.replace(/ +(?= )/g, '');
        values = row.split(" ");

        // Prevents empty rows from causing errors
        if (_.isEmpty(values) || values.length !== 6) return;

        entries.push({
          updatedAt: new Date(),
          IP: values[0],
          MAC: values[3].toUpperCase()
        });
      });

      entries.forEach((entry) => {

        var ARPEntry = ARPEntries.findOne({MAC: entry.MAC});

        // A new user connected to the router
        // If MAC address doesn't exist in mongodb, add it
        if (!ARPEntry) {

          var response

          try {
            response = HTTP.call("POST", "http://api.macvendors.com/" + entry.MAC);
          }
          catch (e) {
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
            ARPEntries.update(ARPEntry, {$set: {IP: entry.IP}});
          }
        }
      });

      // The user is not connected to the router anymore
      // Clean up mongodb: if MAC address is in mongodb but not in router table, remove it from mongodb
      var currentMAC = _.map(ARPEntries.find().fetch(), (entry) => entry.MAC);
      var newMAC = _.map(entries, (entry) => entry.MAC);
      var MACtoRemove = _.difference(currentMAC, newMAC);

      MACtoRemove.forEach((MAC) => {
        ARPEntries.remove({MAC: MAC});
      });

      LastAPICall.update({api: 'arp'}, {$set: {success: true}});

      response.end(JSON.stringify({success: true, message: 'successfully retrieved data'}));

    }
  }
);

SpaceApi = new Restivus({
  apiPath: 'spaceapi/',
  version: 'v1'
});

SpaceApi.addRoute(
  'status',
  {authRequired: false},
  {
    get () {
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(Meteor.settings.public.spaceapi, null, 4));
    }
  }
);