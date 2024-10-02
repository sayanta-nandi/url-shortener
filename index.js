const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const {connectomongo} = require("./connect");
const app = express();
const port = 8001;

connectomongo("mongodb://localhost:27017/short-url")
.then(() => console.log("mongo connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(port, () => {
    console.log(`server started at port: ${port}`)
})