AutoForm.hooks({
  updateUserForm: {
    onError: function(formType, error) {
      console.log('onError');
      console.log(error);
    }
  }
});

Template.user_update.helpers({
    user: function() {
      var u = Meteor.users.findOne(FlowRouter.getParam('_id'));
      return u;
    }
});
