/*jshint esversion: 6 */
$(document).ready(function () {
    $('#uploadButton').click(() => {
        // Import files
        var form_data = importFiles();
        if (form_data) {
            $.ajax({
                url: '/process', // Point to server
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
                        var predictMsg = `This picture is classified as ${curImg.prediction[0]}, with probability ${curImg.prediction[1]}`;
                        // display prediction messages
                        var newCard = `<div class="card mb-3" style="max-width: 1000px;">
                                        <div class="row no-gutters"><div class="col-md-7">
                                        <img src="${`${location.hostname}/getImg/` + curImg.imgName}" class="card-img"></div>
                                        <div class="col-md-5"><div class="card-body">
                                        <h5 class="card-title">${imgNo}</h5>
                                        <p class="card-text">${predictMsg}.</p></div></div></div></div>`;
                        $(".imgCard").append(newCard);
                    }
                }, error: function (response) {
                    console.log(response.name);
                    // newAlert(response.message);
                    // $('.errorMsg').html();
                }
            });
        }
    });
});
// --------------------------------------------------
var displayError = false;
var ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif'];
function checkExtension(fileName) {
    ext = fileName.split('.')[1].toLowerCase();
    return (ALLOWED_EXTENSIONS.includes(ext) ? true : false);
}
function importFiles() {
    // Remove previous error message
    if ($('.error-row').children().length > 0) {
        $('.error').remove();
    }
    var form_data = new FormData();
    var fileList = $('#inputImg')[0].files.length;
    // Check if no file was selected
    if (fileList == 0) {
        newAlert('ERROR! Please select at least one image');
        return;
    }
    // Check for invalid file extensions
    for (i = 0; i < fileList; i++) {
        var curFile = $('#inputImg')[0].files[i].name;
        if (checkExtension(curFile) == false) {
            newAlert('ERROR! Please select files in image formats (png, jpg, jpeg, gif)');
            return;
        }
    }
    // var fileSize = 0;
    // Add images to form data
    for (i = 0; i < fileList; i++) {
        // key = 'image' + String(i);
        form_data.append('image', $('#inputImg')[0].files[i]);
        // fileSize = fileSize + $('#inputImg')[0].files[i].size;
        
    }
    // console.log(form_data)
    // console.log(fileSize);
    // if (fileSize > 16384) {
    //     newAlert();
    //     $('.errorMsg').html('ERROR (Maximum 16MB is allowed)');
    //     return;
    // }
    return form_data;
}

function newAlert(errorMsg) {
    var newAlert = `<div class="alert alert-danger alert-dismissible error" role="alert">
                    <p class="errorMsg">${errorMsg}</p>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button></div>`;

    if ($('.error-row').children().length === 0) {
        $(".error-row").append(newAlert);        
    } else {
        $('.errorMsg').html(errorMsg);
        // $('.error').css({'display':'inline'});
    }
}