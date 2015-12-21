Template.arpView.helpers({

    ARPEntries: function() {

        return App.Collections.ARPEntries.find();
    },

    lastAPICall: function() {

        return App.Collections.LastAPICall.findOne({api:'arp'});
    }

});