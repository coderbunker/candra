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
    BlazeLayout.render('layoutLogin', {header: 'menuDefault', content: 'login'});
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

FlowRouter.route('/members', {
  name: 'members',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'members'});
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

FlowRouter.route('/whosthere', {
  name: 'whosthere',
  action() {
    BlazeLayout.render('layoutDefault', {header: 'menuDefault', content: 'whosthere'});
  }
});

var publicRoutes = FlowRouter.group({
  name: 'public',
  prefix: '/public'
});

publicRoutes.route('/whosthere', {
  name: 'whostherepublic',
  action() {
    BlazeLayout.render('layoutPublic', {content: 'whosthere'});
  }
});

publicRoutes.route('/members', {
  name: 'memberspublic',
  action() {
    BlazeLayout.render('layoutPublic', {content: 'members'});
  }
});