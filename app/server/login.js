
Accounts.onCreateUser(function(options, user) {
  if(!options || !user) {
    console.log('error creating user');
    return;
  } else {
    console.log(options, user)
    user.profile = options.profile;

    if(user.services.github) {
      user.profile.email = user.services.github.email;
      user.emails = user.services.github.emails.map(function(o) {
        return { address: o.email, verified: o.verified };
      });
      delete user.services.github.emails;
    }
    console.log(JSON.stringify(user));
    return user;
  }
});
