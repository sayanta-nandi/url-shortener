// import { nanoid } from 'nanoid';
const URL = require("../models/url");

async function generateNewShortURL(req, res){
    const body = req.body;
    const { nanoid } = await import("nanoid");
    if(!body.url) return res.status(400).json({ error: "no url"});
    let shortID = nanoid(8);
    console.log(shortID);
    try {
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
        const allurl = await URL.find({});
        return res.render("home", {
            id: shortID,
            urls: allurl,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(500).json({ error: "Duplicate shortID, please try again" });
        }
        return res.status(500).json({ error: "Server error" });
    }
}

async function postUrl(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        },
    }
);
    res.redirect(entry.redirectURL);
}

module.exports = {
    generateNewShortURL,
    postUrl,
};