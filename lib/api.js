Router.map(function () {
  this.route('status', {
    path: '/status',
    where: 'server',
    action: function () {
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(Meteor.settings.public.spaceapi, null, 4));
    }
  });
});