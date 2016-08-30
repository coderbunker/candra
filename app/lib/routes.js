FlowRouter.route('/', {
  name: 'home',
  action() {
    FlowRouter.go('profile');
  }
});

FlowRouter.notFound = {
  action() {
    FlowRouter.go('home');
  }
};

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('layoutPublic', {header: 'menuDefault', content: 'login'});
  }
});

FlowRouter.route('/profile', {
  name: 'profile',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'profile'});
  }
});

FlowRouter.route('/devices', {
  name: 'devices',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'devices'});
  }
});

FlowRouter.route('/orgs', {
  name: 'orgs',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'orgs'});
  }
});

FlowRouter.route('/projects', {
  name: 'projects',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'projects'});
  }
});

FlowRouter.route('/residencies', {
  name: 'residencies',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'residencies'});
  }
});

FlowRouter.route('/arpview', {
  name: 'arpview',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'arpview'});
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'admin'});
  }
});

FlowRouter.route('/users/create', {
  name: 'create',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'user_create'});
  }
});

FlowRouter.route('/users/:_id/edit', {
  name: 'edit',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'user_update'});
  }
});


var publicRoutes = FlowRouter.group({
  name: 'public',
  prefix: '/public'
});

publicRoutes.route('/whosthere', {
  name: 'whosthere',
  action() {
    if (Meteor.userId()) {
      BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'whosthere'});
    }
    else {
      BlazeLayout.render('layoutPublic', {content: 'whosthere'});
    }
  }
});