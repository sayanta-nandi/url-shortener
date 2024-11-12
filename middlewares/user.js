const { getUser } = require("../service/auth");

async function restricToUsers(req, res, next) {
  const user = req.user;
  if (!user) return res.redirect("/login");
  next();
}

async function restricToAdminOnly(req, res, next){
  const user = req.user;
  // console.log(user.role);
  if(!(user.role === "ADMIN")) return res.end("unathorise");
  next();
}

async function checkAuth(req, res, next) {
  const tokenCookie = req.cookies;
  if(!tokenCookie) return next();
  const token = tokenCookie.uid;
  const user = getUser(token);
  req.user = user;
  next();
}

module.exports = {
  checkAuth,
  restricToUsers,
  restricToAdminOnly,
};