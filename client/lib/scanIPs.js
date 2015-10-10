Meteor.startup(() => {

    Candra.Tools.getLocalIPCandidates();

    Meteor.call('getRemoteIPAddress', function (error, ip) {

        if (!error) {
            Candra.Tools.remoteIPAddress.set(ip);
        }
    });

    Tracker.autorun(() => {

        // Both are reactive variable, this code will rerun with changes
        var ARPEntries = Candra.Collections.ARPEntries.find();
        var localIps = Candra.Tools.localIPCandidates.get();
        var remoteIp = Candra.Tools.remoteIPAddress.get();

        if (ARPEntries && localIps) {

            ARPEntries.forEach(entry => {

                localIps.forEach(localIP => {

                    if (entry.IP === localIP) {

                        Meteor.call('updateDevice', entry.MAC);
                    }
                });
            });
        }
    });
});

Template.registerHelper('localIPCandidates', function () {
    return Candra.Tools.localIPCandidates.get() || "unknown";
});

Template.registerHelper('remoteIPAddress', function () {
    return Candra.Tools.remoteIPAddress.get() || "unknown";
});