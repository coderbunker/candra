import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { HTTP } from 'meteor/http'
import '../../../server/api/endpoints.js';
import '../../../server/secret/routers.js';

const address = 'http://localhost:3100';
const key = 'v1';
const arpTable = 'arp';
const name = 'candra';
const authToken = 'Bearer abcd';

describe('arp', function() {
    it('accepts correct call', function() {
        HTTP.call(
            'POST',
            address + '/routerapi/v1/arp/' + name,
        	{headers: {'Authorization': authToken}, body: {}},
            function(error, result) {
            	console.log(result);
                chai.assert(!error,'there was an error: \n' + error);
                chai.assert.equal(result.statusCode,200,'Status code didn\'t match 200 it was ' + result.statusCode);
            }
        );
    });
});
