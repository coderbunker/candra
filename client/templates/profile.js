Template.profile.events({

    'submit form': function(e, t) {

        e.preventDefault();
        Session.set(ERRORS_KEY, {});

        var MACElt = e.currentTarget.elements.deviceMac;
        var nameElt = e.currentTarget.elements.deviceName;

        if (!Candra.Tools.validateMac(MACElt.value)) {
            console.log('zlouga');
            Session.set(ERRORS_KEY, {'deviceMac': "Bad MAC address"});
            return;
        }

        Meteor.call('updateDevice', MACElt.value, nameElt.value);

        MACElt.value = '';
        nameElt.value = '';

    },

    'change #picture-input': function (e, template) {

        // Check for the various File API support.
        if (window.File && window.FileReader) {
            // Great success! All the File APIs are supported.
        } else {
            alert('The File APIs are not fully supported in this browser.');
            return;
        }

        if (!e.currentTarget.files) {
            return;
        }

        var file = e.currentTarget.files[0];

        if (file.type.substring(0, 5) !== "image") {
            alert("The selected file must be an image.");
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = function () {
            let resizedImg = Candra.Tools.resizeImage(reader.result);
            console.log(resizedImg);
            Meteor.call('updateProfilePicture', resizedImg);
            //Session.set('photo', reader.result);
        }
    }
});