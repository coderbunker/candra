
getCurrentConfiguration = function() {
  return Meteor.settings.public;
}

UI.registerHelper('appName', function(context, options) {
  return getCurrentConfiguration().spaceapi.space;
});
