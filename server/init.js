//console.log(process.env);
ServiceConfiguration.configurations.upsert(
  { service: "weibo" },
  {
    $set: {
      clientId: Meteor.settings.google.clientid,
      loginStyle: "popup",
      secret: Meteor.settings.google.clientsecret,
    }
  }
);