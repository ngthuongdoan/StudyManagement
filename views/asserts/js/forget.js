/* eslint-disable no-undef */
$(function () {
  $("#emailSubmit").click(() => {
    $.ajax({
      type: "POST",
      url: "/forget",
      data: {
        email: $("#email").val(),
      },
      success: (response) => {
        Swal.fire({
          title: "Check your email",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Confirm",
          showLoaderOnConfirm: true,
        }).then((result) => {
          if (result.value && result.value == response.code) {
            Swal.fire({
              icon: "success",
              title: "Success",
            }).then((result) => {
              if (result.value) updatePassword();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Try again",
            }).then((result) => {
              if (result.value) window.location = "/forget";
            });
          }
        });
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Wrong email",
        });
      },
    });
  });
});

const updatePassword = () => {
    $("#forget").hide();
    $("#newpasswordform").show();
  $("#updateBtn").click(() => {
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
          url: "/forget?_method=PUT",
          type: "POST",
          data: {
            email: $("#email").val(),
            newpassword: password,
          },
          success:()=>{
              window.location="/login";
          }
        });
      }
    }
  });
};
