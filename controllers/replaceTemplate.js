exports.replaceTemplate = (state, content, template) => {
  if (!state) return template.toString().replace("{% POPUP %}", content);
};
