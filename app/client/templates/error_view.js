Template.error_view.onCreated(function() {
    Meteor.subscribe('Meteor.orgLogs');
});

Template.error_view.helpers({
	'getError' : function(){
		return JSON.stringify(App.Collections.OrgLogs.findOne(FlowRouter.getParam('_id')),null, '\t');
	}
})