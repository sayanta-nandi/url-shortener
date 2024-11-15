const jwt = require("jsonwebtoken");
const secret = "skjnsjnv";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    }, secret);
}

function getUser(token) {
    if(!token) return null;
    try {
        user = jwt.verify(token, secret);
        // console.log(user);
        return user;
    } catch (error) {
        return null;
    }
}

module.exports = {
  setUser,
  getUser,
};