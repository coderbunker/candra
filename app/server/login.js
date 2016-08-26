
Accounts.onCreateUser(function(options, user) {
  if(!options || !user) {
    console.log('error creating user');
    return;
  } else {
    user.profile = options.profile;

    if(user.services.github) {
      user.profile.email = user.services.github.email;
      // TODO: array of objects is rejected by Mongo
      // fails with "RangeError: Maximum call stack size exceeded"
      // user.emails = user.services.github.emails;
    }
    console.log(user);
    return user;
  }
});
