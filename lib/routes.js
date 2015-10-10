var ARPEntries = Candra.Collections.ARPEntries;
var LastAPICall = Candra.Collections.LastAPICall;

Router.configure({
    layoutTemplate: 'main'
});

if (Meteor.isClient) {
    Router.onBeforeAction(function () {
        // all properties available in the route function
        // are also available here such as this.params

        if (!Meteor.userId()) {
            // if the user is not logged in, render the Login template
            this.render('login');
        } else {
            // otherwise don't hold up the rest of hooks or our route/action function
            // from running
            this.next();
        }
    });
}

Router.route('/', {
    name: 'home',
    template: 'home'

});

Router.route('/arpview', {
    name:'arpView',
    action: function() {
        this.render();
    }
});

Router.route('/router/arp/:name', function () {

    var request = this.request;
    var response = this.response;
    var key, arpTable, headers = request.headers;
    var routers = Candra.routers;
    var router = _.findWhere(routers, {name: this.params.name});

    LastAPICall.upsert({api:'arp'}, {api: 'arp', lastCall: new Date()});

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

    arpTable = request.body.arpTable;

    var rows = arpTable.split("\n");
    var entries = [];

    rows.forEach((row, index) => {
        if (index === 0) return;
        var values;
        row = row.replace(/ +(?= )/g,'');
        values = row.split(" ");
        entries.push({
            updatedAt: new Date(),
            IP: values[0],
            MAC: values[3]
        });
    });
    console.log(entries);

    entries.forEach((entry) => {

        var ARPEntry = ARPEntries.findOne({MAC: entry.MAC});

        // A new user connected to the router
        // If MAC address doesn't exist in mongodb, add it
        if (!ARPEntry) {
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

    response.end(JSON.stringify({success: true, message: 'successfully retrieved data'}));

}, {where: 'server'});