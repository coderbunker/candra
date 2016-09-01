console.log(Object.keys(Package));
Package['accounts-password'] = undefined;

Meteor.startup(() => {
  AutoForm.setDefaultTemplate("semanticUI");

});