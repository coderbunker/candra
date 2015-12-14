function oauthConfig(service, clientId, secret) {
   ServiceConfiguration.configurations.upsert(
    { service: service },
    {
      $set: {
        clientId: clientId,
        loginStyle: "popup",
        secret: secret,
      }
    }
  ); 
}

function initOrgs() {
  var directory = Meteor.http.call("GET", "http://spaceapi.net/directory.json?api=0.13");
  var urls = Object.keys(directory.data).map(function(k) { 
    var exist = Candra.Collections.Orgs.findOne({space: k});
    if(!exist) {
      try {
        var url = directory.data[k];
        console.log('fetching ' + url);
        var result = Meteor.http.call("GET", url);
        Candra.Collections.Orgs.upsert({space: result.data.space}, result.data);
        return result.data;
        console.log(e);
      } catch(e) {
        console.log(e);
      }
    } else {
      return exist;
    }
  });
}

Meteor.startup(function() {
  var config = getCurrentConfiguration();

  if(config.github) {
    oauthConfig('github', config.github.clientId, config.github.secret);
  }

  if(config.github) {
    oauthConfig('google', config.google.clientId, config.google.secret);
  }

  //console.log(initOrgs());
});
