function getCurrentConfiguration() {
  var currentUrl = Router.current().originalUrl;
  if(currentUrl.startsWith("http://localhost") || currentUrl.startsWith('https://members.hackacademy.org')) {
    return {appName: 'HackAcademy.org'};
  } else if(currentUrl.indexOf('codersfield')) {
    return {appName: 'Codersfield'};
  }
}

UI.registerHelper('appName', function(context, options) {
  return getCurrentConfiguration().appName;
});
