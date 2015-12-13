Template.main.helpers({
    email: function() {
        console.log(Meteor.user());
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