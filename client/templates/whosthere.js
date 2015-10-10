Template.whosthere.onCreated(function () {

    this.connectedMembers = function () {
        var ARPentries = Candra.Collections.ARPEntries.find({}, {$sort: {'profile.name': 1}});

        return _.sortBy(ARPentries.map(entry => {

            console.log("there");
            var user = Meteor.users.findOne({'profile.devices.MAC': entry.MAC});

            return {
                email: user ? user.emails[0].address : '<unknown>',
                name: user ? user.profile.name : '<unknown>',
                MAC: entry.MAC,
                time: entry.updatedAt,
                picture: user ? user.profile.picture : null,
                order: user ? 0 : 1,
                unknown: user ? false : true
            };
        }), 'order');
    };

    var b = this.connectedMembers();
    console.log(b);
});

Template.whosthere.onRendered(function() {

    this.$('.ui.dropdown')
        .dropdown();
});


Template.whosthere.helpers({

    connectedMembers: function() {
        return Template.instance().connectedMembers();
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

        Meteor.call('updateDevice', MAC, user.userId);

    }
});

