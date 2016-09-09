import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { users } from '../../../server/api/users.js';

var assert = chai.assert,
  expect = chai.expect;

const VALID_DOC = {
  profile: {
    name: 'Ricky Ng-Adam',
    email: 'rngadam@example.com'
  },
  createdAt: new Date()
};

const VALID_DOC_MINIMAL = {
  profile: {
    email: 'rngadam@example.com'
  },
  createdAt: new Date()
};


describe('users', function() {
  it('rejects incorrect insert without email ', function() {
    assert.throws(function() {
      Meteor.call('users.insert', { profile: { name: 'Ricky Ng-Adam' } });
    }, "Match", 'Email is required');
  });

  it('rejects missing created at', function() {
    assert.throws(function() {
      Meteor.call('users.insert', { profile: { name: 'Ricky Ng-Adam', email: 'rngadam@example.com' } });
    }, "Match", 'Created at is required');
  });

  it('rejects invalid email', function() {
    assert.throws(function() {
      Meteor.call('users.insert', { profile: { name: 'Ricky Ng-Adam', email: 'rngadam' } });
    }, "Match", 'Email is required');
  });

  it('accepts correct insert', function() {
    Meteor.call('users.insert', VALID_DOC);
  });

  it('accepts correct insert even without name', function() {
    Meteor.call('users.insert', VALID_DOC_MINIMAL);
  });

  it('does not accept removing createdAt in update', function() {
    var id = Meteor.users.insert(VALID_DOC);
    assert.throws(function() {
      Meteor.call('users.update', { $set: { createdAt: null } }, id);
    }, 'Match', 'Created at is required');
  });

  it('accepts name update', function() {
    var id = Meteor.users.insert(VALID_DOC);
    Meteor.call('users.update', { $set: { 'profile.name': 'Not Ricky Ng-Adam' } }, id);
  });

  it('removal of user', function() {
    var id = Meteor.users.insert(VALID_DOC);
    Meteor.call('users.remove', [id]);
  });

  it('removal of users', function() {
    var id1 = Meteor.users.insert(VALID_DOC);
    var id2 = Meteor.users.insert(VALID_DOC);
    Meteor.call('users.remove', [id1, id2]);
  });
})
