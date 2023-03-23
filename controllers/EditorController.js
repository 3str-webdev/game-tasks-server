class EditorController {
  getPreview(req, res) {
    // console.log(req.body);
    res.json(req.body);
  }
}

module.exports = new EditorController();
