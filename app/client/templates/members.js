Template.members.onCreated(function () {
    Meteor.subscribe('Meteor.users');
});

Template.members.helpers({
  members: function () {
    all = Meteor.users.find({}).fetch();
    chunks = [];
    size = 3;
    while (all.length > size) {
        chunks.push({ row: all.slice(0, size)});
        all = all.slice(size);
    }
    chunks.push({row: all});
    return chunks;
  },
  membersCount: function() {
    return Meteor.users.find().count();
  }
});