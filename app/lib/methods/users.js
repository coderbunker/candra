Meteor.methods({
  'updateProfilePicture': function(picture) {

    check(picture, String);
    Meteor.users.update(this.userId, {$set: {'profile.picture': picture}});

    return true;
  }
});
