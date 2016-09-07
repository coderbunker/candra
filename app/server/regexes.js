var isIP = function(field) {
    return new RegExp("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$").test(field);
};

var isMAC = function(field) {
    return new RegExp("^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$").test(field);
};

export {isIP, isMAC};