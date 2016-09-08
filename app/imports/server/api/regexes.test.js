import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { isMACreg, isIPreg } from '../../../server/api/arpTable.js';

var assert = chai.assert,
  expect = chai.expect;

describe('MAC regex', function() {
  it('accepts dash notation MAC', function() {
    assert(isMACreg.exec('00-26-BB-07-54-80'));
  });

  it('accepts column notation MAC', function() {
    assert(isMACreg.exec('8C:3A:E3:93:83:93'));
  });

  it('rejects too short MAC', function() {
    assert(!isMACreg.exec('00-26-BB-07-54'));
  });

  it('rejects too long MAC', function() {
    assert(!isMACreg.exec('00:26:BB:07:54:34:FD'));
  });

  it('rejects lower case MAC', function() {
    assert(!isMACreg.exec('00-26-bb-07-54-80'));
  });

  it('rejects empty MAC', function() {
    assert(!isMACreg.exec(''));
  });

  it('rejects MAC without separation', function() {
    assert(!isMACreg.exec('0026BB075480'));
  });

  it('only accepts A-F as characters', function() {
    assert(!isMACreg.exec('00-26-RB-07-54-80'));
  });
});

describe('IP regex', function() {
  it('accepts correct IP', function() {
    assert(isIPreg.exec('192.168.1.50'));
  });

  it('rejects too long IP', function() {
    assert(!isIPreg.exec('192.168.1.50.23'));
  });

  it('rejects too short IP', function() {
    assert(!isIPreg.exec('192.168.1'));
  });

  it('rejects too high value IP', function() {
    assert(!isIPreg.exec('192.521.1.50'));
  });

  it('rejects IP with characters', function() {
    assert(!isIPreg.exec('192.168.1a.50'));
  });

  it('rejects IP with columns', function() {
    assert(!isIPreg.exec('192:168:1:50'));
  });

  it('rejects IP with dashes', function() {
    assert(!isIPreg.exec('192-168-1-50'));
  });

  it('rejects IP with no separation', function() {
    assert(!isIPreg.exec('192168150'));
  });

  it('rejects empty IP', function() {
    assert(!isIPreg.exec(''));
  });
});
