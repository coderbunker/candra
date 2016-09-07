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
    optional: true,
    blackbox: true
  },
  errorMessage: {
    type: Object,
    optional: true,
    blackbox: true
  },
  failureCount: {
    type: Number,
    optional: true,
    defaultValue: 0
  }
});

OrgLogs = new Mongo.Collection('orgLogs');
OrgLogs.attachSchema(OrgLogsSchema);

function createNewSuccessLog(url, data) {
  return { 
    statusCode: 200, 
    url: url, 
    data: data, 
    errorMessage: null, 
    lastSuccess: new Date()
  };
}

function createNewErrorLog(url, e) {
  var statusCode = null;
  if (e.response) {
      statusCode = e.response.statusCode;
  } 
  return { 
    statusCode: statusCode, 
    url: url, 
    data: null, 
    // clone to plain object to get rid of tricky native properties
    errorMessage: JSON.parse(JSON.stringify(e)), 
    lastSuccess: null 
  };
}

function createOrUpdateLog(newLog) {
  OrgLogs.upsert({ url: newLog.url }, {$set: newLog});
  OrgLogs.update({url: newLog.url }, {$inc: {failureCount: 1}});
}

App.Collections.OrgLogs = OrgLogs;

export default { 
  OrgLogs, 
  createNewSuccessLog, 
  createNewErrorLog, 
  createOrUpdateLog 
};