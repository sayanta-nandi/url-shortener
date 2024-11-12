const User = require("../models/user");
const {setUser} = require("../service/auth");

async function handleUserSignUp(req, res) {
    await User.create(req.body);
    return handleUserLogIn(req, res);
}
async function handleUserLogIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            error: "Wrong email or password",
        });
    }
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn
}