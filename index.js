require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const ApiRouter = require("./routers/api/ApiRouter");

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", ApiRouter);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
