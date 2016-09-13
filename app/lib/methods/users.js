Meteor.methods({
    'user/updateProfilePicture': function(picture) {

        check(picture, String);
        Meteor.users.update(this.userId, { $set: { 'profile.picture': picture } });

        return true;
    },

    'user/updateDevice': function(MAC, name) {

        userId = Meteor.userId();

        check(userId, String);
        check(MAC, String);
        check(name, Match.Optional(name));

        App.Services.Users.updateDevice(userId, { MAC: MAC, name: name });
    },

    'user/getRemoteIPAddress': function() {

        if (this.isSimulation) return;

        var clientIP = this.connection.clientAddress;
        return clientIP;
    }
});
