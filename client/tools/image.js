Candra.Tools.resizeImage = function (data) {

    //var width = 240;
    //var image = new Image();
    //image.src = data;
    //var canvas = document.getElementById("photo");
    //var height = width * image.height / image.width;
    //canvas.width = width;
    //canvas.height = height;
    //canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    //return canvas.toDataURL("image/jpg", 0.7);

    var maxLength = 240;
    var image = new Image();
    var sourceX, sourceY, sourceMaxL;
    image.src = data;
    var canvas = document.getElementById("photo-work");

    if (image.height > image.width) {
        sourceX = 0;
        sourceY = Math.floor((image.height - image.width) / 2);
        sourceMaxL = image.width;
    } else {
        sourceX = Math.floor((image.width - image.height) / 2);
        sourceY = 0;
        sourceMaxL = image.height;
    }

    console.log(sourceX);
    console.log(sourceY);
    console.log(sourceMaxL);

    canvas.width = maxLength;
    canvas.height = maxLength;
    canvas.getContext('2d').drawImage(image, sourceX, sourceY, sourceMaxL, sourceMaxL, 0, 0, maxLength, maxLength);
    return canvas.toDataURL("image/jpg", 0.7);
};