// Specs must be in child folder to be loaded first
// Should be improved using comming ES6 modules

if (Meteor.isClient) {
  App.Services.Users = Object.assign(App.Services.UsersCommon, App.Services.UsersClient);
}

if (Meteor.isServer) {
  App.Services.Users = Object.assign(App.Services.UsersCommon, App.Services.UsersServer);
}