function oauthConfig(service, clientId, secret) {
  ServiceConfiguration.configurations.upsert(
    {service: service},
    {
      $set: {
        clientId: clientId,
        loginStyle: "popup",
        secret: secret
      }
    }
  );
}

function initOrgs() {
  var directory = Meteor.http.call("GET", "http://spaceapi.net/directory.json?api=0.13");
  var urls = Object.keys(directory.data).map(function (k) {

    if (!App.Collections.Orgs.findOne({space: k})) {
      console.log(k);
      // Execute http calls asynchronously so we don't block execution for client inbound client request
      // Meteor.defer = Meteor.setTimeout(x, 0)
      var url = directory.data[k];

      Meteor.defer(function () {
        try {
          console.log('fetching ' + url);
          var result = Meteor.http.call("GET", url);

          var data;
          try {
            data = JSON.parse(result.content);
          } catch(e) {
            data = result.data;
          }

          if (!data) {
            console.log("No data found or invalid response for: " + url);
            return;
          }
          App.Collections.Orgs.upsert({space: k}, {
            space: k,
            data: data
          });
        } catch (e) {
          console.log("Error getting data for: " + url);
          console.log(e);
        }

      });
      return url;
    } else {
      return '';
    }
  });

  return _.compact(urls);
}

Meteor.startup(function () {
  var config = getCurrentConfiguration();

  if (config.github) {
    oauthConfig('github', config.github.clientId, config.github.secret);
  }

  if (config.github) {
    oauthConfig('google', config.google.clientId, config.google.secret);
  }

  console.log(initOrgs());
});
