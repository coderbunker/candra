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

var config = getCurrentConfiguration();

if(config.github) {
  oauthConfig('github', config.github.clientId, config.github.secret);
}

if(config.github) {
  oauthConfig('google', config.google.clientId, config.google.secret);
}