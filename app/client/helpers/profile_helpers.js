function userEmail() {
  var profile = Meteor.user() && Meteor.user().profile;
  return (profile && profile.email) || "unknown@example.com";
}

UI.registerHelper('profilePictureUrl', function(context, options) {
  if(this.profile && this.profile.image_url) {
    return this.profile.image_url;
  }
  if(this.profile && this.profile.email) {
    return Gravatar.imageUrl(this.profile.email, context.hash);
  }
  return Gravatar.imageUrl('hello@example.com', context.hash);

});

UI.registerHelper('emailAddress', function(context, options) {
  userEmail();
});
