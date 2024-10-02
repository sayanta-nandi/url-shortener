const mongoose = require("mongoose");

async function connectomongo(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectomongo,
}