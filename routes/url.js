const express = require("express");
const { generateNewShortURL, postUrl } = require("../controllers/url");

const router = express.Router();

router.post('/', generateNewShortURL);
router.get("/:shortId", postUrl);

module.exports = router;