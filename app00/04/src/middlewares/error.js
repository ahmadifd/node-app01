export default (err, req, res, next) => {
  //winston.error(err.message, err);
  res.status(500).json({ message: "(server error) something failed" });
  console.log(err);
};
