Template.admin.onCreated(function () {
    Meteor.subscribe('Meteor.users');
    this.currentTab = new ReactiveVar('admin_users');
});

Template.admin_organisations.onCreated(function () {
    Meteor.subscribe('Meteor.orgLogs');
});

Template.admin_controls.events({
    'click #flushdb': function() {
      console.log('flushing db');
      Meteor.call('admin/flushdb');
    }
});

Template.admin.helpers({
  tab: function () {
      return Template.instance().currentTab.get();
    }
});

Template.admin_users.helpers({
  settings: function () {
          return {
              onCreate: function() {
                console.log('onCreate');
                FlowRouter.go('/users/create');
              },
              onEdit: function(params) {
                console.log(params);
                console.log('onEdit ' + params.ids);
                FlowRouter.go('/users/' + params.ids[0] + '/edit');
              },
              onDelete: function(params) {
                Meteor.call('users.remove', params.ids);
              },
              collection: Meteor.users,
              rowsPerPage: 10,
              showFilter: true,
              fields: [
                {key: 'profile.email', label: 'email'},
                {key: 'profile.name', label: 'name'},
                {key: 'profile.title', label: 'title'},
                {key: 'profile.bio', label: 'bio'},
                {key: 'profile.image_url', label: 'image', tmpl: Template.userPhoto}
              ]
          };
  }
});

Template.admin_organisations.helpers({
  orgLogs: function() {
    console.log('found');
    console.log(App.Collections.OrgLogs.find({}).fetch());
    return App.Collections.OrgLogs.find({}).fetch();
  }
})

Template.admin.events({
  'click .usersButton': function( event, template ) {
    template.currentTab.set('admin_users');
  },
  'click .controlsButton': function( event, template ) {
    template.currentTab.set('admin_controls');
  },
  'click .organisationsButton': function( event, template ) {
    template.currentTab.set('admin_organisations');
  }
})

Template.admin_organisations.events({
  'click .errorButton': function(){
    console.log("clicked the button");
  }
})