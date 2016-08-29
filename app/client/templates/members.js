
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
  }
});