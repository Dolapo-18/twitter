const passportJWT = require("passport-jwt");
const mongoose = require("mongoose");
const keys = require("./keys");

const User = require("../Models/User");
const opts = {
	jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.secret
};

module.exports = passportStrategy = passport => {
	passport.use(
		new passportJWT.Strategy(opts, (payload, done) => {
			User.findById(payload.id, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}

				return done(null, user);
			});
		})
	);
};
