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
    try{
        var directory = Meteor.http.call("GET", "http://spaceapi.net/directory.json?api=0.13");
        console.log('fetching spaceAPI.');
        var urls = Object.keys(directory.data).map(function(k) {
            if (!App.Collections.Orgs.findOne({ space: k })) {
                var url = directory.data[k];
                Meteor.defer(function() {
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
    } catch (e){
        console.log('fetching spaceAPI has failed, error:');
        console.log(e);
    }
}

Meteor.startup(function() {
    var config = getCurrentConfiguration();
    console.log(config);
    if(config.environment == "local" && config.github.local){
        console.log("Github Local login configured");
        oauthConfig('github', config.github.local.clientId, config.github.local.secret);
    }
    if(config.environment == "develop" && config.github.develop){
        console.log("Github Develop login configured");
        oauthConfig('github', config.github.develop.clientId, config.github.develop.secret);
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

Meteor.publish("Meteor.arptable", function() {
    return App.Collections.ARPEntries.find({});
});

