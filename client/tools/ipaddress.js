// NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

Candra.Tools.localIPCandidates = new ReactiveVar();

Candra.Tools.remoteIPAddress = new ReactiveVar();

Candra.Tools.getLocalIPCandidates = function() {

    var foundAddrs = [];

    if (!RTCPeerConnection) {
        return false;
    }

    var rtc = new RTCPeerConnection({iceServers:[]});

    if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
        rtc.createDataChannel('', {reliable:false});
    };

    rtc.onicecandidate = function (evt) {
        // convert the candidate to SDP so we can run it through our general parser
        // see https://twitter.com/lancestout/status/525796175425720320 for details
        if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
    };
    rtc.createOffer(function (offerDesc) {
        grepSDP(offerDesc.sdp);
        rtc.setLocalDescription(offerDesc);
    }, function (e) { console.warn("offer failed", e); });

    var addrs = Object.create(null);
    addrs["0.0.0.0"] = false;

    function addAddress(newAddr) {
        if (newAddr in addrs) return;
        else addrs[newAddr] = true;
        foundAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });

        Candra.Tools.localIPCandidates.set(foundAddrs);
    }

    function grepSDP(sdp) {
        var hosts = [];
        sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
            if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                    addr = parts[4],
                    type = parts[7];
                if (type === 'host') addAddress(addr);
            } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                var parts = line.split(' '),
                    addr = parts[2];
                addAddress(addr);
            }
        });
    }

    return;

    //console.log(foundAddrs);
    //return foundAddrs;
};
