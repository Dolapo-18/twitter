const posts = document.querySelector("#posts");

const createPost = ({post, id}) => {
	const div = `<div class="card">
						<div class="card-body">
							<p class="card-text">
								${post}
							</p>
							<div class="d-flex flex-row justify-content-between">
								<button onclick="likePost(${id})" class="btn btn-blue">Like</button>
								<button class="btn btn-danger">Delete</button>
							</div>
						</div>
					</div>`;
	return div;
};

const addPosts = event => {
	let divs = "";
	const token = getToken();
	const headers = {
		'Authorization': `Bearer ${token}`
	}
	axios.get("http://localhost:5000/api/notes/all", {headers})
	.then(res => {
		res.data.forEach(post => {
			const div = createPost(post);
			divs += div;
		});
		posts.innerHTML = divs;

	})
	.catch(e => console.log(e));
};


window.addEventListener("DOMContentLoaded", addPosts);

function likePost(event) {
	const {id  } = event.target
	axios.get(`http://localhost:5000/posts/${id}`)
	.then(res=> createResponse(res.data.msg, "bg-success")).catch(e => createResponse('Post not liked!'))
}