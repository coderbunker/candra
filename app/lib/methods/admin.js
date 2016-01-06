Meteor.methods({
  'admin/flushdb': function() {
    console.log('removing all users!');
    Meteor.users.remove({});
  }
});
