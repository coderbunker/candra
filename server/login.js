Accounts.onCreateUser(function(options, user) {
  if(!options || !user) {
    console.log('error creating user');
    return;
  } else {
    if(options.profile) {
      user.profile = options.profile;
    }
    if(user.services.github) {
      user.emails = user.services.github.emails;
    }
    return user;
  }
});