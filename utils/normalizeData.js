const normalizeData = (data) => {
  const result = {};
  for (const key in data) {
    result[key] = stringToHtml(data[key]);
  }
  return result;
};

const stringToHtml = (str) => {
  const result = removeTags(str);
  return result.split("\n").join("<br>");
};

const removeTags = (str) => {
  str = str.replaceAll(/<(\w|\W)*>(\w|\W)*<\/(\w|\W)*>/gi, "");
  str = str.replaceAll(/<(\w|\W)*>/gi, "");
  str = str.replaceAll(/<\/(\w|\W)*>/gi, "");
  return str;
};

module.exports = normalizeData;
