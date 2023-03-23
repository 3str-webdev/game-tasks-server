const checkPassword = (req, res, next) => {
  // console.log(req.body);
  if (req.body.password !== process.env.POST_PASSWORD) {
    res.status(400).json("Неверный пароль");
    return;
  }
  next();
};

module.exports = {checkPassword};
