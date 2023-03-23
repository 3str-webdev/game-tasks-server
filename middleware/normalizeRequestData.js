const { convertData } = require("../utils/convertData");
const normalizeData = require("../utils/normalizeData");

const normalizeRequestData = (req, res, next) => {
  req.body.data = normalizeData(req.body.data);
  req.body.data = convertData(req.body.data);
  next();
};

module.exports = { normalizeRequestData };
