Template.main.helpers({
    email: function() {
        return Meteor.user().emails[0].address;
    }
});

Template.main.events({

    'click #logout': function() {
        Meteor.logout();
    }
});