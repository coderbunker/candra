 Template.orgs.events({
   
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
        reader.readAsDataURL(file);

        reader.onloadend = function () {
            let resizedImg = App.Tools.resizeImage(reader.result);
            Meteor.call('user/updateProfilePicture', resizedImg);
        }
    }
});