
import { UserSchema, UserProfileSchema } from '../../lib/collections/Users.js';


Meteor.methods({
  'users.insert'(doc) {
    doc.createdAt = new Date();
    check(doc, UserSchema);
    Meteor.users.insert(doc);
  },
  'users.remove'(taskIds) {
    Meteor.users.remove({'_id': {'$in': taskIds}});
  },
  'users.update'(modifier, documentId) {
    check(modifier, UserSchema);
    Meteor.users.update(documentId, modifier);
  }
});