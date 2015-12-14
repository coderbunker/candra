Template.main.helpers({
    email: function() {
        return Meteor.user().emails[0].address;
    },
    routeActive: function(name) {
        return (Router.current().route.getName() === name) ? "active" : "";
    }
});

Template.main.events({
    'click #logout': function() {
        AccountsTemplates.logout();
    }
});