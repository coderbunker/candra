Template.admin.onCreated(function () {
    Meteor.subscribe('Meteor.users');
});

Template.admin.events({
    'click #flushdb': function() {
      console.log('flushing db');
      Meteor.call('admin/flushdb');
    }
});

Template.admin.helpers({
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