Candra.Tools.validateMac = function (mac) {

    return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(mac);

};