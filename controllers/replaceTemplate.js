exports.replacePopupTemplate = (state, position, content, template) => {
  if(content === "") return template.toString().replace(position, "");
  let co = (!state)? `<script>
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '${content}'
    })
  </script>`
    : `<script>
    Swal.fire({
        icon: 'success',
        title: 'Login Success <3',
    });
    </script>`;
  return template.toString().replace(position, co);
};

exports.replaceTemplate = (position, content, template) => {
  return template.toString().replace(position, content);
};
