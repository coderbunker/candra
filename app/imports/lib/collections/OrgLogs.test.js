import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import logs from '../../../lib/collections/OrgLogs.js';
import { resetDatabase } from 'meteor/xolvio:cleaner';

const TEST_URL = 'http://example.com/api';

beforeEach(function() {
  resetDatabase();
});

describe('OrgLogs', function () {
  function skip_client(name, callback) {
    if(!Meteor.isClient) {
      it(name, callback);
    }
  }

  skip_client('adding a new successful log', function () {
    var newLog = logs.createNewSuccessLog(TEST_URL, {payload: 'some string'});
    logs.createOrUpdateLog(newLog);

    var entry = logs.OrgLogs.findOne({url: TEST_URL});
    chai.assert.instanceOf(entry.timestamp, Date);
    chai.assert.equal(entry.statusCode, 200);
    chai.assert.instanceOf(entry.lastSuccess, Date);
  });

  skip_client('adding a new log with error', function () {
    var newLog = logs.createNewErrorLog(TEST_URL, {response: {statusCode: 404}});
    logs.createOrUpdateLog(newLog);

    var entry = logs.OrgLogs.findOne({url: TEST_URL});
    chai.assert.instanceOf(entry.timestamp, Date);
    chai.assert.equal(entry.statusCode, 404);
    chai.assert.equal(entry.lastSuccess, null);
  });

  skip_client('error log followed by successful log', function() {
    var errorLog = logs.createNewErrorLog(TEST_URL, {response: {statusCode: 404}});
    var successLog = logs.createNewSuccessLog(TEST_URL, {payload: 'some string'});

    logs.createOrUpdateLog(errorLog);
    logs.createOrUpdateLog(successLog);

    var entry = logs.OrgLogs.findOne({url: TEST_URL});
    chai.assert.instanceOf(entry.timestamp, Date);
    chai.assert.equal(entry.statusCode, 200);
    chai.assert.instanceOf(entry.lastSuccess, Date);
    chai.assert.equal(entry.error, null);
    chai.assert.equal(entry.data.payload, 'some string');
  });

  skip_client('success log followed by error log', function() {
    var errorLog = logs.createNewErrorLog(TEST_URL, {response: {statusCode: 404}, message: 'this error'});
    var successLog = logs.createNewSuccessLog(TEST_URL, {payload: 'some string'});

    logs.createOrUpdateLog(successLog);

    var originalSuccess = logs.OrgLogs.findOne({url: TEST_URL});

    logs.createOrUpdateLog(errorLog);

    var entry = logs.OrgLogs.findOne({url: TEST_URL});
    chai.assert.instanceOf(entry.timestamp, Date);
    chai.assert.equal(entry.statusCode, 404);
    chai.assert.equal(entry.lastSuccess.getTime(), originalSuccess.lastSuccess.getTime());
    chai.assert.equal(entry.error.message, 'this error');
  });

  skip_client('error object recorded', function() {
    var errorLog = logs.createNewErrorLog(TEST_URL, {
      response: {statusCode: 404},
      message: 'hello world'
    });
    logs.createOrUpdateLog(errorLog);

    var entry = logs.OrgLogs.findOne({url: TEST_URL});
    chai.assert.equal(entry.error.message, 'hello world');
  });

  skip_client('failure count updated', function() {
    var errorLog = logs.createNewErrorLog(TEST_URL, {response: {statusCode: 404}});
    logs.createOrUpdateLog(errorLog);
    logs.createOrUpdateLog(errorLog);
    logs.createOrUpdateLog(errorLog);

    var entry = logs.OrgLogs.findOne({url: TEST_URL});
    chai.assert.equal(entry.failureCount, 3);
  });

  skip_client('success count updated', function() {
    var newLog = logs.createNewSuccessLog(TEST_URL, {payload: 'some string'});
    logs.createOrUpdateLog(newLog);
    logs.createOrUpdateLog(newLog);
    logs.createOrUpdateLog(newLog);
    var entry = logs.OrgLogs.findOne({url: TEST_URL});
    chai.assert.equal(entry.successCount, 3);
  });
});