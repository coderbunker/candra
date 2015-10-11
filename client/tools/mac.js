Candra.Tools.validateMac = function (mac) {

    mac = mac.toUpperCase();

    return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(mac);

};