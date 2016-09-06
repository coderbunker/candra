Template.error_view.onCreated(function() {
    Meteor.subscribe('Meteor.orgLogs');
});

Template.error_view.helpers({
	'getError' : function() {
    console.log(App.Collections.OrgLogs.findOne(FlowRouter.getParam('_id')));
		return JSON.stringify(App.Collections.OrgLogs.findOne(FlowRouter.getParam('_id')), null, '\t');
	}
})