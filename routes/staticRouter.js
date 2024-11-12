const express = require("express");
const URL = require("../models/url");
const { restricTo } = require("../middlewares/user");

const router = express.Router();

router.get("/", async (req, res) => {
    const user = req.user;
    if(!user) return res.render("home", {
        noUser: true,
    })
    const allurls = await URL.find({ createdBy: user._id });
    console.log(user.name);
    return res.render("home",{
        urls: allurls,
        createdBy: user.name,
    });
});

router.get("/signup", async(req, res) => {
    return res.render("signup");
});

router.get("/login", async(req, res) => {
    return res.render("login");
});

router.get("/logout", async(req, res) => {
    res.clearCookie("uid");
    return res.redirect("/login");
})

module.exports = router;