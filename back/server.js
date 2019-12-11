const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const keys = require("./config/keys");
const passportStrategy = require("./config/passport");
const route = require("./routes/index");

mongoose.set("useCreateIndex", true);
mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true, autoReconnect: true })
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

const app = express();
const server = express();

const corsOption = {
	allowHeaders: ["Content-Type", "Accept", "Authorization"],
	allowMethods: ["GET", "PUT", "POST", "OPTIONS"],
	origin: "*"
};
// middleware
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
passportStrategy(passport);
app.use("/api", route);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
