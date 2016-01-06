Template.menuDefault.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});

Template.menuDefault.events({
  'click #logout': function() {
    AccountsTemplates.logout();
  }
});