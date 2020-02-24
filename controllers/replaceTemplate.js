exports.replaceTemplate = (state, position, content, template) => {
  if (!state) return template.toString().replace(position, content);
};
