var OrgLogsSchema = new SimpleSchema({
  statusCode: {
    type: Number,
    optional: true
  },
  url: {
    type: String,
    optional: true
  },
  error: {
    type: Object,
    optional: true
  },
  lastSuccess: {
    type: Date,
    optional: true
  },
  data: {
    type: Object,
    optional: true
  },
  errorMessage: {
    type: Object,
    optional: true,
    defaultValue: {}
  }
});

App.Collections.OrgLogs = new Mongo.Collection('orgLogs');

App.Collections.OrgLogs.attachSchema(OrgLogsSchema);
