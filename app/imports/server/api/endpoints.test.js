import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { getEntries } from '../../../server/api/endpoints.js';

var assert = chai.assert,
    expect = chai.expect;

const NoEntries = 'IP address       HW type     Flags       HW address            Mask     Device';
const ThreeEntries = 'IP address       HW type     Flags       HW address            Mask     Device\r\n192.168.1.11     0x1         0x2         8c:3a:e3:93:83:93     *        br0\r\n192.168.1.50     0x1         0x2         00:26:bb:07:54:80     *        br0\r\n192.168.1.18     0x1         0x2         3c:15:c2:cc:dc:2a     *        br0';

const processedThreeEntries = [
	{
        IP : '192.168.1.11',
        MAC : '8C:3A:E3:93:83:93'
    },
    {
        IP : '192.168.1.50',
        MAC : '00:26:BB:07:54:80'
    },
    {
        IP : '192.168.1.18',
        MAC : '3C:15:C2:CC:DC:2A'
    }
];

describe('users', function() {
    it('processes correct arpTables', function() {
    	var result = getEntries(ThreeEntries);
    	for (var i = result.length - 1; i >= 0; i--) {
    		delete result[i].updatedAt;
    	}
    	console.log(result);
    	assert.deepEqual(result,processedThreeEntries);
    });

    it('processes correct empty arpTables', function() {
    	var result = getEntries(NoEntries);
    	console.log(result);
    	assert.deepEqual(result,[]);
    });
});
