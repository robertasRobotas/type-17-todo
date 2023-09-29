const PRINT_INFO = (req, res) => {
  console.log(req.body.info);
  return res.json({ response: req.body.info });
};

module.exports = { PRINT_INFO };
