module.exports = {
	test(req, res) {
		res.status(200).json({ msg: "Route works" });
	},

	register(req, res) {
		const { errors, isValid } = validateRegisterInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		User.findOne({ email: req.body.email }).then(user => {
			if (user) {
				errors.push("Email already exit");
				return res.status(400).json(errors);
			}

			const avatar = gravatar.url(req.body.email, {
				s: 200,
				r: "pg",
				d: "mm"
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				avatar
			});

			bcrypt.hash(newUser.password, 10, (err, hash) => {
				newUser.password = hash;

				newUser
					.save()
					.then(data =>
						res.status(200).json({ msg: "User created!" })
					)
					.catch(e => console.log(e));
			});
		});
	}
};
