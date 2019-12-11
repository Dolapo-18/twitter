const bcrypt = require("bcrypt");
const express = require("express");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const controllers = require("../controllers");

const User = require("../Models/User");
// const Post = require("../Models/Post");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const keys = require("../config/keys");
/**
 * @route POST api/test
 * @desc test route
 * @access Public
 */
router.get("/test", controllers.test);

/**
 * @route POST api/users/register
 * @desc create new user route
 * @access Public
 */
router.post("/users/register", controllers.register);

/**
 * @route POST api/users/signin
 * @desc login user route
 * @access Public
 */
router.post("/users/signin", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) return res.status(400).json(errors);

	const { email, password } = req.body;

	User.findOne({ email })
		.then(user => {
			if (!user) {
				errors.push("User not found");
				return res.status(404).json(errors);
			}

			bcrypt.compare(password, user.password).then(isMatch => {
				if (!isMatch) {
					errors.push(
						"Please provide a valid email and password combination."
					);
					return res.status(400).json(errors);
				}

				const payload = {
					id: user.id,
					email: user.email,
					name: user.name
				};

				jwt.sign(
					payload,
					keys.secret,
					{ expiresIn: "3d" },
					(err, token) => {
						if (err) throw err;

						return res
							.status(200)
							.json({ msg: "User created", token });
					}
				);
			});
		})
		.catch(err => console.log(err));
});

/**
 * @route GET api/users/current
 * @desc current user route
 * @access Private
 */
router.get(
	"/users/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { avatar, email, name } = req.user;

		return res.status(200).json({ avatar, email, name });
	}
);

/**
 * @route POST api/posts/new
 * @desc create new post route
 * @access Private
 */
router.post(
	"posts/new",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		if (!isValid) return res.status(400).json(errors);

		const newPost = new Post({
			user: req.user.id,
			post: req.body.post,
			likes: []
		});

		newPost
			.save()
			.then(post => res.status(200).json({ msg: "Post Added!", post }));
	}
);

/**
 * @route POST api/posts/new
 * @desc create new post route
 * @access Private
 */
router.post(
	"/posts/edit/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// validate req.body input

		Post.findById(req.params.id).then(post => {
			if (!post) return req.status(404).json();

			if (post.post === req.body.post) {
				return res.status(200);
			}
			post.post = req.body.post;

			post.save()
				.then(done => res.status(200).json({ msg: "Post Edited" }))
				.catch(e => throw e);
		});
	}
);

/**
 * @route GET api/posts/new
 * @desc like post route
 * @access Private
 */
router.get(
	"/posts/:id/like",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = [];
		errors.length = 0;
		const { id } = req.params;

		Post.findById(id).then(post => {
			if (!post) {
				errors.push("Post not found. Must have been deleted!");
				return res.status(404).json(errors);
			}

			const check = post.likes.filter(
				like => like.toString() === req.user.id
			);

			if (check.length > 0) {
				errors.push("User already liked this post");
				return req.status(400).json(errors);
			}

			// post.likes.push(req.user.id);
			post.likes.unshift(req.user.id);

			post.save().then(done =>
				res.status(200).json({ msg: "Post liked!" })
			);
		});
	}
);

router.get(
	"/posts/all",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.find()
			// .sort({ date: -1 })
			.then(posts => res.status(200).json(posts))
			.catch(e => console.log(e));
	}
);

module.exports = router;
