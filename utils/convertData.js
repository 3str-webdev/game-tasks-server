const { dataDict } = require("./convertDict");

const convertData = (data) => {
  const result = {};
  for (const key in data) {
    result[key] = data[key];
    for (const toolName in dataDict) {
      result[key] = toolHandler(result[key], toolName);
    }
  }
  return result;
};

const toolHandler = (str, nameOfTool) => {
  const convertOptions = dataDict[nameOfTool];
  const regExp = new RegExp(
    `${convertOptions.open}${/(\w|\W)+/.source}${convertOptions.close}`,
    "ig"
  );
  return str.replaceAll(regExp, (match) => {
    let res = match;
    res = res.replaceAll(convertOptions.open, convertOptions.openTag);
    res = res.replaceAll(convertOptions.close, convertOptions.closeTag);
    return res;
  });
};

module.exports = { convertData };
