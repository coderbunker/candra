Template.forceLoggin.onCreated(function() {

  var instance = this;

  instance.autorun(function() {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      FlowRouter.go('login');
    }
  });

});

Template.forceLoggin.helpers({
  userLogginIn: function() {
    return Meteor.loggingIn();
  }
});