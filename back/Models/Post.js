const mongoose = reuire("mongoose");

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: "users"
	},
	post: {
		type: String,
		required: true
	},
	likes: [
		{
			type: mongoose.Types.ObjectId,
			ref: "users"
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("posts", PostSchema);
