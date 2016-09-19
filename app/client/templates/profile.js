Template.profile.onCreated(function () {
    Meteor.subscribe('Meteor.arptable');
    Meteor.subscribe('Meteor.users');
});

Template.profile.helpers({
	macs: function(IP){
        cursor = App.Collections.ARPEntries.find({"IP" : IP[0]});
        result = [];

        cursor.map(entry => {
        	//TODO: use proper projection
        	var user = Meteor.users.findOne({'profile.devices.MAC': entry.MAC });
        	var name;
        	user.profile.devices.map(MACentry => {
        		if(MACentry.MAC == entry.MAC){
        			name = MACentry.name;
        		}
        	})
        	result.push({'MAC': entry.MAC, 'name': name});
        });

        return result;
	}
});