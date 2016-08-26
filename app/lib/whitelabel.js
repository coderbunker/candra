getCurrentConfiguration = function() {
  return Meteor.settings;
};

UI.registerHelper('appName', function(context, options) {
  return Meteor.settings.public.spaceapi.space;
});
