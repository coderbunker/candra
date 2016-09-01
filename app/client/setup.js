Meteor.startup(() => {
  AutoForm.setDefaultTemplate("semanticUI");
  console.log(Object.keys(Package));
  Package['accounts-password'] = undefined;
});