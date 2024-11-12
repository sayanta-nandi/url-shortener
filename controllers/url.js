const URL = require("../models/url");

async function generateNewShortURL(req, res) {
    const body = req.body;
    const { nanoid } = await import("nanoid");
    if (!body.url) return res.status(400).json({ error: "no url" });
    let shortID = nanoid(8);
    console.log(shortID);
    console.log(req.user);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allurls,
        id: shortID,
        createdBy: req.user.name,
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

async function getAllUrl(req, res) {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
        createdBy: req.user.name,
    });
}

module.exports = {
    generateNewShortURL,
    handleGetAnalytics,
    getAllUrl,
};