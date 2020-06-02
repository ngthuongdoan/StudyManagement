/* eslint-disable no-undef */
$("#avatar").click(function(e) {
    $("#upload").click();
});

function fasterPreview( uploader ) {
    if ( uploader.files && uploader.files[0] ){
          $("#avatar").attr("src", 
             window.URL.createObjectURL(uploader.files[0]) );
    }
}

$("#upload").change(function(){
    fasterPreview( this );
});

const uploadAccount = () => {};