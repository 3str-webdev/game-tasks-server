const router = require("express").Router();

const EditorController = require("../../controllers/EditorController");
const { normalizeRequestData } = require("../../middleware");

router.post("/preview", normalizeRequestData, EditorController.getPreview);

module.exports = router;
