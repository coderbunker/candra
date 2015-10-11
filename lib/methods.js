Meteor.methods({
    'updateDevice': function (MAC, name, userId) {

        check(MAC, String);

        if (!userId) {
            userId = Meteor.userId();
        }

        name = name || 'unkown';

        // Add device to user profile
        Meteor.users.update(userId, {
            $addToSet: {
                'profile.devices': {
                    name: name,
                    MAC: MAC
                }
            }
        });

        // Remove the device if it was used previously by another user
        Meteor.users.update({_id: {$ne: userId}}, {$pull: {'profile.devices': {MAC: MAC}}}, {multi: true});

    },
    'getRemoteIPAddress': function() {

        if (this.isSimulation) return;

        var clientIP = this.connection.clientAddress;
        return clientIP;
    },
    'updateProfilePicture': function(picture) {

        check(picture, String);

        Meteor.users.update(this.userId, {$set: {'profile.picture': picture}});

        return true;
    }

});