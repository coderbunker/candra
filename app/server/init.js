import logs from '../lib/collections/OrgLogs.js';

function oauthConfig(service, clientId, secret) {
    check(service, String);
    check(clientId, String);
    check(secret, String);

    ServiceConfiguration.configurations.upsert({ service: service }, {
        $set: {
            clientId: clientId,
            loginStyle: "popup",
            secret: secret
        }
    });
}

function initOrgs() {
    var directory = Meteor.http.call("GET", "http://spaceapi.net/directory.json?api=0.13");
    var urls = Object.keys(directory.data).map(function(k) {
        if (!App.Collections.Orgs.findOne({ space: k })) {
            Meteor.defer(function() {
                var url = directory.data[k];
                var newLog;
                try {
                    var result = Meteor.http.call("GET", url);
                    newLog = logs.createNewSuccessLog(url, JSON.parse(result.content));
                } catch (e) {
                    newLog = logs.createNewErrorLog(url, e);
                }
                logs.createOrUpdateLog(newLog);

                return url;
            });
        } else {
            return '';
        }
    });

    return _.compact(urls);
}

Meteor.startup(function() {
    var config = getCurrentConfiguration();
    console.log(config);
    if (config.github) {
        console.log("Github login configured");
        oauthConfig('github', config.github.clientId, config.github.secret);
    }

    if (config.google) {
        console.log("Google login configured");
        oauthConfig('google', config.google.clientId, config.google.secret);
    }
    if (Meteor.settings.spaceapienabled) {
        initOrgs();
    }
});

Meteor.publish("Meteor.users", function() {
    var fields = {
        'profile.name': 1,
        'profile.bio': 1,
        'profile.title': 1,
        'profile.image_url': 1,
    };
    var findCriteria = { 'profile.name': { $exists: true } };
    if (this.userId) {
        fields['profile.email'] = 1;
        findCriteria = {};
    }
    return Meteor.users.find(findCriteria, { fields: fields });
});

Meteor.publish("Meteor.orgLogs", function() {
    return App.Collections.OrgLogs.find({});
});
