Template.whosthere.onCreated(function () {
    Meteor.subscribe('Meteor.arptable');
});

Template.whosthere.onRendered(function() {

    this.$('.ui.dropdown')
        .dropdown();
});


Template.whosthere.helpers({

    connectedMembers: function() {
        var ARPentries = App.Collections.ARPEntries.find();

        console.log("ARPEntries :: ")
        console.log(App.Collections.ARPEntries.find().fetch());

        var i = 0;

        return _.sortBy(_.sortBy(ARPentries.map(entry => {

            var user = Meteor.users.findOne({'profile.devices.MAC': entry.MAC});

            return {
                //email: user ? user.emails[0].address : '<unknown>',
                name: user ? user.profile.name : '<unknown>',
                MAC: entry.MAC,
                company: entry.company,
                type: entry.type,
                time: entry.updatedAt,
                picture: user ? user.profile.picture : null,
                order: user ? 0 : 1,
                unknown: user ? false : true
            };
        }), 'name'), 'order');
    },

    unknownMemberClass: function() {
        return (this.name === '<unknown>') ? 'unknown-connected-member' : '';
    },

    allMembers: function() {
        return Meteor.users.find();
    }

});

Template.whosthere.events({

    'click .item.user': function (e, t) {

        var user = this;
        var MAC = e.currentTarget.dataset.value;

        Meteor.call('user/updateDevice', MAC, null, user._id);

    }
});

