Meteor.methods({
  'users.insert'(doc) {
    Meteor.users.insert(doc);
  },
  'users.remove'(taskIds) {
    Meteor.users.remove({'_id': {'$in': taskIds}});
  },
  'users.update'(modifier, documentId) {
    Meteor.users.update(documentId, modifier);
  }
});