RouterApi = new Restivus({
    apiPath: 'routerapi/',
    version: 'v1'
});

ARPEntries = App.Collections.ARPEntries;
APICalls = App.Collections.APICalls;

var getEntries = function(arpTable) {

    console.log('processing arp table \n' + arpTable);

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
            } else if (!MAC && isMAC(field)) {
                MAC = field.toUpperCase();
            }
        })

        //if both fields are found in the row push.
        if (IP && MAC) {
            entries.push({
                updatedAt: new Date(),
                IP: values[0],
                MAC: values[3].toUpperCase()
            });
        }

    });

    return entries;
};

var isIP = function(field){
	return true;
}

var isMAC = function(field){
	return new RegExp("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$").test(field);
}

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


RouterApi.addRoute(
    'arp/:name', {
        authRequired: false,
        prettyJson: true,
        defaultHeaders: { 'Content-Type': 'application/json' }
    }, {
        post() {
            var request = this.request;
            var response = this.response;
            var key, arpTable, headers = request.headers;
            var routers = App.routers;
            var router = _.findWhere(routers, { name: this.urlParams.name });

            if (!router) {
                return {
                    statusCode: 404,
                    body: {
                        success: false,
                        message: 'this router does not exist in configuration'
                    }
                };
            }

            if (!headers.authorization) {
                return {
                    statusCode: 401,
                    body: {
                        success: false,
                        message: 'authorization token missing'
                    }
                };
            }

            var key = headers.authorization.substring(7);

            if (key !== router.key) {
                return {
                    statusCode: 401,
                    body: {
                        success: false,
                        message: 'wrong authorization key'
                    }
                };
            }

            if (!request.body.arpTable) {
                return {
                    statusCode: 400,
                    body: {
                        success: false,
                        message: 'invalid request, missing arpTable'
                    }
                };
            }

            APICalls.upsert({ api: 'arp' }, {
                $set: {
                    api: 'arp',
                    time: new Date(),
                    clientIP: request.headers['x-forwarded-for']
                }
            });

            var arpTable = request.body.arpTable;
            console.log(arpTable);

            var entries = getEntries(arpTable);
            console.log(entries);


            entries.forEach((entry) => {

                associateEntry(entry);


            });

            clearExpiredEntries(entries);

            return { success: true, message: 'successfully retrieved data' };

        }
    }
);

SpaceApi = new Restivus({
    apiPath: 'spaceapi/',
    version: 'v1'
});

SpaceApi.addRoute(
    'status', {
        authRequired: false,
        prettyJson: true
    }, {
        get() {
            this.response.setHeader('Content-Type', 'application/json');
            this.response.end(Meteor.settings.public.spaceapi);
        }
    }
);

export { getEntries, clearExpiredEntries, associateEntry, isIP, isMAC };
