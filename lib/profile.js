
function userEmail() {
  if(Meteor.user().profile.email)
    return Meteor.user().profile.email;
  else
    return "unknown@example.com";
}

UI.registerHelper('profilePictureUrl', function(context, options) {
  return Gravatar.imageUrl(userEmail(), context.hash);
});

UI.registerHelper('emailAddress', function(context, options) {
  userEmail();
});
