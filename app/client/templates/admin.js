Template.admin.onCreated(function() {
    Meteor.subscribe('Meteor.users');
    this.currentTab = new ReactiveVar('admin_users');
});

Template.admin_organisations.onCreated(function() {
    Meteor.subscribe('Meteor.orgLogs');
});

Template.admin_organisations.events({
    'click #errorButton' : function(event){
        FlowRouter.go('/error/' + event.target.value);
    }
})

Template.admin_controls.events({
    'click #flushdb': function() {
        console.log('flushing db');
        Meteor.call('admin/flushdb');
    }
});

Template.admin.helpers({
    tab: function() {
        return Template.instance().currentTab.get();
    }
});

Template.admin_users.helpers({
    settings: function() {
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
                { key: 'profile.email', label: 'email' },
                { key: 'profile.name', label: 'name' },
                { key: 'profile.title', label: 'title' },
                { key: 'profile.bio', label: 'bio' },
                { key: 'profile.image_url', label: 'image', tmpl: Template.userPhoto }
            ]
        };
    }
});

Template.admin_success_status.helpers({
    isSuccess: function(statusCode) {
        return 200 == statusCode;
    }
});

Template.admin_organisations.helpers({
    settings: function() {
        return {
            onDelete: function(params) {
                Meteor.call('users.remove', params.ids);
            },
            collection: App.Collections.orgLogs,
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'statusCode', label: 'Success', tmpl: Template.admin_success_status },
                { key: 'lastSuccess', label: 'Last success' },
                { key: 'url', label: 'URL' },
                { key: 'error', label: 'Error', tmpl: Template.admin_error_button },
            ]
        };
    },
    orgLogs: function() {
        return App.Collections.OrgLogs;
    }
})

Template.admin.events({
    'click .usersButton': function(event, template) {
        template.currentTab.set('admin_users');
    },
    'click .controlsButton': function(event, template) {
        template.currentTab.set('admin_controls');
    },
    'click .organisationsButton': function(event, template) {
        template.currentTab.set('admin_organisations');
    }
})