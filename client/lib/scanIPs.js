Meteor.startup(() => {

    App.Tools.getLocalIPCandidates();

    Meteor.call('getRemoteIPAddress', function (error, ip) {

        if (!error) {
            App.Tools.remoteIPAddress.set(ip);
        }
    });

    Tracker.autorun(() => {

        // Both are reactive variable, this code will rerun with changes
        var ARPEntries = App.Collections.ARPEntries.find();
        var localIps = App.Tools.localIPCandidates.get();
        var remoteIp = App.Tools.remoteIPAddress.get();

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
    return App.Tools.localIPCandidates.get() || "unknown";
});

Template.registerHelper('remoteIPAddress', function () {
    return App.Tools.remoteIPAddress.get() || "unknown";
});