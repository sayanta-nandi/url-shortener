const URL = require("../models/url");

async function generateNewShortURL(req, res){
    const body = req.body;
    const { nanoid } = await import("nanoid");
    if(!body.url) return res.status(400).json({ error: "no url"});
    let shortID = nanoid(8);
    console.log(shortID);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    console.log(req.user.name);
    return res.render("home", {
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

module.exports = {
    generateNewShortURL,
    handleGetAnalytics,
};