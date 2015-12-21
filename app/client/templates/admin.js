Template.admin.events({
    'click #flushdb': function() {
      console.log('flushing db');
      Meteor.call('flushdb');
    }
});