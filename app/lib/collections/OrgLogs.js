var OrgLogsSchema = new SimpleSchema({
  timestamp: {
    type: Date,
    optional: false
  },
  url: {
    type: String,
    optional: false
  },
  statusCode: {
    type: Number,
    optional: true
  },
  error: {
    type: Object,
    optional: true,
    blackbox: true
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
  successCount: {
    type: Number,
    optional: true,
    defaultValue: 0
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
    error: null, 
    timestamp: new Date(),
    lastSuccess: new Date()
  };
}

function createNewErrorLog(url, e) {
  var statusCode = null;
  if (e.response) {
      statusCode = e.response.statusCode;
  } 
  return { 
    timestamp: new Date(),
    statusCode: statusCode, 
    url: url, 
    data: null, 
    // clone to plain object to get rid of tricky native properties
    error: JSON.parse(JSON.stringify(e))
  };
}

function createOrUpdateLog(newLog) {
  OrgLogs.upsert({ url: newLog.url }, {$set: newLog});
  if(newLog.error) {
    OrgLogs.update({url: newLog.url }, {$inc: {failureCount: 1}});
  } else {
    OrgLogs.update({url: newLog.url }, {$inc: {successCount: 1}});
  }
}

App.Collections.OrgLogs = OrgLogs;

export default { 
  OrgLogs, 
  createNewSuccessLog, 
  createNewErrorLog, 
  createOrUpdateLog 
};