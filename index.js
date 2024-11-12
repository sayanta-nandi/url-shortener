const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const {connectomongo} = require("./connect");
const { restricToUsers,checkAuth } = require("./middlewares/user");
const URL = require("./models/url");
const app = express();
const port = 8001;

connectomongo("mongodb://localhost:27017/short-url")
.then(() => console.log("mongo connected"));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use(checkAuth);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.use("/user", userRoute);
app.use("/url",restricToUsers, urlRoute);
app.use("/", staticRoute);

app.listen(port, () => {
    console.log(`server started at port: ${port}`)
})