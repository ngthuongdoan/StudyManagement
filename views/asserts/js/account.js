/* eslint-disable no-undef */
$("#avatar").click(function (e) {
  $("#upload").click();
});

function fasterPreview(uploader) {
  if (uploader.files && uploader.files[0]) {
    $("#avatar").attr("src", window.URL.createObjectURL(uploader.files[0]));
  }
}

$("#upload").change(function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.value) {
      let data = new FormData();
      $.each($("#upload")[0].files, function (i, file) {
        data.append("file-" + i, file);
      });
      fasterPreview(this);
      $.ajax({
        type: "POST",
        url: "/change-avatar",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
          Swal.fire({
            icon: "success",
            title: "Updated!!!",
          });
        },
      });
    }
  });
});

const updateAccount = () => {
  const password = $("#newpassword").val();
  const confirm = $("#confirmpassword").val();

  if ((password !== "") | (confirm !== "")) {
    let error = false;
    if (password.length < 6 || password.includes(" ")) {
      error = true;
    } else {
      if (confirm !== password) {
        error = true;
      }
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid new password",
      });
    } else {
      $.ajax({
        url: "/account?_method=PUT",
        type: "POST",
        data: {
          oldpassword: $("#oldpassword").val(),
          newpassword: password,
        },
        error: () => {
          Swal.fire({
            icon: "error",
            title: "Wrong old password",
          });
        },
        success: () => {
          window.location = "/login";
        },
      });
    }
  }
};
