//console.log(process.env);
ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: Meteor.settings.google.clientid,
      loginStyle: "popup",
      secret: Meteor.settings.google.clientsecret,
    }
  }
);

ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      clientId: Meteor.settings.github.clientid,
      loginStyle: "popup",
      secret: Meteor.settings.github.clientsecret,
    }
  }
);