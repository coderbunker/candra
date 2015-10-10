ERRORS_KEY = 'form_errors_key';
Session.set(ERRORS_KEY, {});

Template.registerHelper('errorClass', function (element) {

    if (!element) return _.isEmpty(Session.get(ERRORS_KEY)) ? '': 'error';

    return (Session.get(ERRORS_KEY)[element]) ? 'error': '';
});

Template.registerHelper('errorMessage', function (element) {

    return (Session.get(ERRORS_KEY)[element]);
});