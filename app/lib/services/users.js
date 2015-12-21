App.Services.Users = {};
var UserService = App.Services.Users;

UserService.updateDevice = function(userId, device) {

  check(userId, String);
  check(device.MAC, String);
  check(device.name, Match.Optional(String));

  var MAC = device.MAC.toUpperCase();
  var name = device.name;

  name = name || 'unknown';

  Meteor.users.update({_id: userId, 'profile.devices.MAC': MAC}, {$pull: {'profile.devices': {MAC: MAC}}});

  // Add device to user profile
  Meteor.users.update(userId, {
    $addToSet: {
      'profile.devices': {
        name: name,
        MAC: MAC
      }
    }
  });

  // Remove the device if it was used previously by another user
  Meteor.users.update({_id: {$ne: userId}}, {$pull: {'profile.devices': {MAC: MAC}}}, {multi: true});

};