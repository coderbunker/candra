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
                FlowRouter.go('/user/create');
              },
              collection: Meteor.users,
              rowsPerPage: 10,
              showFilter: true,
              fields: [
                {key: 'profile.email', label: 'email'},
                {key: 'profile.name', label: 'name'},
                {key: 'profile.title', label: 'title'},
                {key: 'profile.bio', label: 'bio'},
                {key: 'profile.image_url', label: 'image_url'}
              ]
          };
  }
});