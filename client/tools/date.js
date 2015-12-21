App.Tools.formatStandardDate = function(date) {

    return moment(date).format("MMM Do YY, h:mm:ss a");

};

Template.registerHelper('formatStandardDate', function (date) {
    return App.Tools.formatStandardDate(date);
});

Template.registerHelper('formatDateFromNow', function (date) {
    return moment(date).fromNow();
})
