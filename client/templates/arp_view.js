Template.arpView.helpers({

    ARPEntries: function() {
        console.log("Reactive!");
        return Candra.Collections.ARPEntries.find();
    },

    lastAPICall: function() {

        return Candra.Collections.LastAPICall.findOne({api:'arp'});
    }

});