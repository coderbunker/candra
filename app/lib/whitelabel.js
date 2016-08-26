getCurrentConfiguration = function() {
  return Meteor.settings;
};

UI.registerHelper('appName', function(context, options) {
  return getCurrentConfiguration().spaceapi.space;
});
