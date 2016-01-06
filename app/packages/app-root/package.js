Package.describe({
  "summary": "App Base Namespace Package",
  "name": "app-root",
  "version": "1.0.0"
});

Package.onUse(function (api) {

  //api.use('infinitedg:winston', 'server');
  api.addFiles('lib/base_common.js', ['client', 'server']);
  api.addFiles('lib/base_client.js', 'client');
  api.addFiles('lib/base_server.js', 'server');

  api.export('App');
  //api.export('Logger');

});