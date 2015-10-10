Template.arpView.helpers({

    ARPEntries: function() {

        return Candra.Collections.ARPEntries.find();
    },

    lastAPICall: function() {

        return Candra.Collections.LastAPICall.findOne({api:'arp'});
    }

});