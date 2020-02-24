exports.replaceTemplate = (position, content, template) => {
  return template.toString().replace(position, content);
};
