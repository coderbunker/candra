Template.devices.events({
    'submit form': function(e, t) {

        e.preventDefault();
        Session.set(ERRORS_KEY, {});

        var MACElt = e.currentTarget.elements.deviceMac;
        var nameElt = e.currentTarget.elements.deviceName;

        if (!App.Tools.validateMac(MACElt.value)) {
            Session.set(ERRORS_KEY, {'deviceMac': "Bad MAC address"});
            return;
        }

        Meteor.call('user/updateDevice', MACElt.value, nameElt.value);

        MACElt.value = '';
        nameElt.value = '';

    }
});