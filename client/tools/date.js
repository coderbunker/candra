Candra.Tools.formatStandardDate = function(date) {

    return moment(date).format("MMM Do YY, h:mm:ss a");

};

Template.registerHelper('formatStandardDate', function (date) {
    return Candra.Tools.formatStandardDate(date);
});