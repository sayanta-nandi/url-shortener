const express = require("express");
const { generateNewShortURL,
    handleGetAnalytics,
    getAllUrl,
 } = require("../controllers/url");
 const {restricToAdminOnly} = require("../middlewares/user")

const router = express.Router();

router.post('/', generateNewShortURL);
router.get("/all",restricToAdminOnly, getAllUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;