Template.menuTop.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});

Template.menuTop.events({
  'click #logout': function() {
    AccountsTemplates.logout();
  }
});