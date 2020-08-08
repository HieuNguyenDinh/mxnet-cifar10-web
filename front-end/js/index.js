/*jshint esversion: 6 */ 
$(document).ready(function () {
    $('.close').click(function () {
        $('.error').css({ 'opacity': '0' }).removeClass("fade show");
        displayError = false;
    });
    $('#uploadButton').click(function () {
        if (displayError == true) {
            $('.error').css({ 'opacity': '0' }).removeClass("fade show");
            displayError == false;
        }

        var form_data = importFiles();
        if (form_data) {
            $.ajax({
                url: 'http://localhost:5000/process', // Point to server
                type: 'POST',
                data: form_data,
                contentType: false,
                processData: false,
                success: function (response) {
                    // console.log(Object.keys(response).length);
                    if ($('.card').length) {
                        $('.card').remove();
                    }
                    var resLen = Object.keys(response).length;
                    for (var i = 0; i < resLen; i++) {
                        var curImg = Object.values(response)[i];
                        var imgNo = "Image " + String(i + 1);
                        // display prediction messages
                        
                        var newCard = `<div class="card mb-3" style="max-width: 1000px;"><div class="row no-gutters"><div class="col-md-7"><img src="${'http://localhost:5000/getImg/' + curImg.imgName}" class="card-img"></div><div class="col-md-5"><div class="card-body"><h5 class="card-title">${imgNo}</h5><p class="card-text">${curImg.prediction}.</p></div></div></div></div>`;
                        $(".imgCard").append(newCard);
                    }
                }, error: function (response) {
                    // console.log(response.name);
                    $('.errorMsg').html(response.message);
                    $('.error').css({ 'opacity': '1' }).addClass("fade show");
                    displayError = true;
                }
            });
        }
    });
});
var displayError = false;
var ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif'];
function checkExtension(fileName) {
    ext = fileName.split('.')[1].toLowerCase();
    return (ALLOWED_EXTENSIONS.includes(ext) ? true : false);
}
function importFiles() {
    var form_data = new FormData();
    var fileList = $('#inputImg')[0].files.length;
    // Check if no file was selected
    if (fileList == 0) {
        $('.errorMsg').html('ERROR! Please select at least one image');
        $('.error').css({ 'opacity': '1' }).addClass("fade show");
        displayError = true;
        return;
    }
    // Check for invalid file extensions
    for (i = 0; i < fileList; i++) {
        var curFile = $('#inputImg')[0].files[i].name;
        if (checkExtension(curFile) == false) {
            $('.errorMsg').html('ERROR! Please select files in image formats (png, jpg, jpeg, gif)');
            $('.error').css({ 'opacity': '1' }).addClass("fade show");
            displayError = true;
            return;
        }
    }
    // Add images to form data
    for (i = 0; i < fileList; i++) {
        // key = 'image' + String(i);
        form_data.append('image', $('#inputImg')[0].files[i]);
    }
    return form_data;
}