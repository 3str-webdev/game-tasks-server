const normalizeData = (data) => {
  const result = {};
  for (const key in data) {
    result[key] = stringToHtml(data[key]);
  }
  console.log(result);
  return result;
};

const stringToHtml = (str) => {
  const result = removeTags(str);
  return result.split("\n").join("<br>");
};

const removeTags = (str) => {
    str = str.replaceAll(/<\w*>\w*<\/\w*>/gi, "");
    str = str.replaceAll(/<\w*>/gi, "");
    str = str.replaceAll(/<\/\w*>/gi, "");
  return str;
};

module.exports = normalizeData;
