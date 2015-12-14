Candra.Collections.ARPEntries = new Mongo.Collection('arptable');

Candra.Collections.LastAPICall = new Mongo.Collection('lastapicall');

Candra.Collections.Orgs = new Mongo.Collection('orgs');

Candra.Collections.Jobs = JobCollection('jobs');

Candra.Collections.Jobs.allow({
    // Grant full permission to any authenticated user
    admin: function (userId, method, params) {
      return (userId ? true : false);
    }
  });
