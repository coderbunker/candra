Template.arpView.helpers({

    ARPEntries: function() {

        return App.Collections.ARPEntries.find();
    },

    lastAPICall: function() {

        return App.Collections.APICalls.findOne({api:'arp'}, {sort: {time: -1}});
    }

});