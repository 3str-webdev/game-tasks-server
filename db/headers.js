const DB_Headers = {
  "Content-Type": "application/json",
  "X-Master-Key": process.env.API_KEY,
  "X-Access-Key": process.env.API_ACCESS_KEY,
  "X-Bin-Meta": false,
};

const normalizeHeaders = (headers) => {
  for (const key in headers) {
    headers[key] = "" + headers[key];
  }
};

normalizeHeaders(DB_Headers);

module.exports = { DB_Headers, normalizeHeaders };
