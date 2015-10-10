Template.arpView.helpers({

    ARPEntries: function() {
        console.log("Reactive!");
        return Candra.Collections.ARPEntries.find();
    },

    lastCall: function() {
        return Candra.Collections.ARPEntries.findOne('arp').lastCall;
    }

});