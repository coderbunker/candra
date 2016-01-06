function userEmail() {
  var profile = Meteor.user() && Meteor.user().profile;
  return (profile && profile.email) || "unknown@example.com";
}

UI.registerHelper('profilePictureUrl', function(context, options) {
  return Gravatar.imageUrl(userEmail(), context.hash);
});

UI.registerHelper('emailAddress', function(context, options) {
  userEmail();
});
