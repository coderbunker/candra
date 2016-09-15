Template.profile.onCreated(function () {
    Meteor.subscribe('Meteor.arptable');
});

Template.profile.helpers({
	macs: function(IP){
        result = App.Collections.ARPEntries.find({"IP" : IP[0]});
        return result;
	}
});