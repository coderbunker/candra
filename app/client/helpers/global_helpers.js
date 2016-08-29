Template.registerHelper('pathFor', function (name, params) {
  return FlowRouter.path(name, params.hash);
});

Template.registerHelper('routeActive', function (name, params) {
  FlowRouter.watchPathChange();
  return (FlowRouter.current().route.name === name) ? "active" : "";
});

Template.registerHelper('users', function() {
  return Meteor.users;
});